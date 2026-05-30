import type { ProductRow } from "../data/types";
import { filterProducts, type FilterState } from "../data/facets";
import type { AttendAnswers } from "./attendTypes";

const SAFE_PHRASE =
  "Posso te ajudar a comparar opções. Confirmar no rótulo antes de orientar.";

function normalizeRoutineStep(value: unknown) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
}

const FACE_STEPS = new Set([
  "limpeza",
  "hidratacao",
  "hidratação",
  "protecao_solar",
  "proteção_solar",
  "tratamento_cosmetico",
  "tratamento_cosmético",
  "tratamento"
]);

// Necessidades curatoradas que representam categorias de produto inteiras.
// Usar routine_step direto em vez de busca textual garante resultados
// mesmo quando a área selecionada não coincide com a categoria.
const NEED_ROUTINE_STEP_OVERRIDE: Record<string, string> = {
  "Maquiagem básica": "maquiagem",
  "Perfume/presente": "perfumaria"
};

// Produtos que não fazem sentido como recomendação de balcão e por isso são
// removidos das sugestões: kits/combos (não é uma opção única para comparar),
// produtos infantis e bundles com item não cosmético (ex.: repelente).
const OFF_CONTEXT_PATTERNS: RegExp[] = [
  /\bkit\b/i,
  /\bcombo\b/i,
  /compre e ganhe/i,
  /\bkids?\b/i,
  /infantil/i,
  /\bbeb[eê]s?\b/i,
  /repelente/i
];

// Regiões do corpo detectáveis pelo nome. A base classifica routine_step de
// forma imprecisa (ex.: produto de mãos/cabelo etiquetado como rotina facial),
// então usamos o nome para descartar produtos de OUTRA região na consulta.
const REGION_PATTERNS: Record<string, RegExp> = {
  face: /\b(facial|rosto|face)\b/i,
  body: /\b(corporal|corpo)\b/i,
  hair: /\b(capilar|cabelos?)\b/i,
  hands: /\b(m[aã]os|p[eé]s|pernas?)\b/i
};

const AREA_HOME_REGION: Partial<Record<AttendAnswers["area"], keyof typeof REGION_PATTERNS>> = {
  Rosto: "face",
  Corpo: "body",
  Cabelo: "hair"
};

// Perfumaria mal classificada pela base inclui skincare "sem perfume"; e a
// categoria maquiagem inclui removedores. Esses não são perfume/maquiagem.
const NOT_PERFUME = /sem perfume|gel de limpeza|limpeza facial|sabonete|s[ée]rum|lo[çc][ãa]o de limpeza|espuma.*limpeza|hidratante/i;
const MAKEUP_REMOVER = /demaquilante|[áa]gua micelar|remove.*maquiagem/i;

/** Produto fora de contexto para o foco da consulta (área ou categoria). */
function isOffContextForArea(name: string, context: string): boolean {
  if (context === "Perfumaria") return NOT_PERFUME.test(name);
  if (context === "Maquiagem") return MAKEUP_REMOVER.test(name);

  const home = AREA_HOME_REGION[context as AttendAnswers["area"]];
  if (!home) return false;
  // Se cita a região da consulta, é adequado (ex.: "facial e corporal" no rosto).
  if (REGION_PATTERNS[home].test(name)) return false;
  // Cita explicitamente outra região → fora de contexto.
  return Object.keys(REGION_PATTERNS).some((k) => k !== home && REGION_PATTERNS[k].test(name));
}

/** Indica se o produto é uma recomendação adequada para o balcão. */
export function isRecommendable(product: ProductRow): boolean {
  const name = String(product.Produto ?? "");
  return !OFF_CONTEXT_PATTERNS.some((re) => re.test(name));
}

function makeFilterState(): FilterState {
  return {
    query: "",
    brand: "all",
    routine_step: "all",
    need_tag: "all",
    caution_level: "all",
    complexity_level: "all",
    price_tier: "all",
    needsOnly: false
  };
}

function routineStepFromArea(area: AttendAnswers["area"]): FilterState["routine_step"] {
  if (area === "Corpo") return "corpo";
  if (area === "Cabelo") return "cabelo";
  if (area === "Perfumaria") return "perfumaria";
  if (area === "Maquiagem") return "maquiagem";
  return "all";
}

export function buildAttendResult(allProducts: ProductRow[], answers: AttendAnswers) {
  if (answers.hasAlert) {
    return {
      mode: "alert" as const,
      safePhrase:
        "Com sinal de alerta, eu não recomendo produto agora. Eu chamo o farmacêutico para avaliar com você.",
      reason: "Sinal de alerta marcado",
      items: [] as ProductRow[]
    };
  }

  const f = makeFilterState();
  f.routine_step = routineStepFromArea(answers.area);

  let usedStepOverride = false;
  if (answers.needKind === "tag") {
    f.need_tag = answers.need;
  } else {
    const stepOverride = NEED_ROUTINE_STEP_OVERRIDE[answers.need];
    if (stepOverride) {
      f.routine_step = stepOverride;
      usedStepOverride = true;
    } else {
      f.query = answers.need;
    }
  }

  if (answers.preference === "uso-simples") {
    f.complexity_level = "iniciante";
  }

  if (answers.preference === "mais-suave") {
    f.caution_level = "baixo";
  }

  // No rosto, restringe às etapas da rotina facial (a menos que a necessidade
  // já implique uma categoria via override).
  const constrainToArea = (rows: ProductRow[]) =>
    answers.area === "Rosto" && !usedStepOverride
      ? rows.filter((p) => FACE_STEPS.has(normalizeRoutineStep(p.routine_step)))
      : rows;

  // Foco da consulta: a área escolhida ou, quando a necessidade implica uma
  // categoria (perfumaria/maquiagem), essa categoria.
  const context = usedStepOverride
    ? NEED_ROUTINE_STEP_OVERRIDE[answers.need] === "perfumaria"
      ? "Perfumaria"
      : "Maquiagem"
    : answers.area;

  let items = constrainToArea(filterProducts(allProducts, f))
    .filter(isRecommendable)
    .filter((p) => !isOffContextForArea(String(p.Produto ?? ""), context));

  // Fallback de área: se a área escolhida não produziu resultado, amplia para
  // todas as áreas. Aqui não aplicamos o filtro de contexto: se não há nada
  // na região da consulta, mostrar algo relevante é melhor do que vazio.
  if (items.length === 0 && !usedStepOverride) {
    items = filterProducts(allProducts, { ...f, routine_step: "all" }).filter(isRecommendable);
  }

  items = items.slice(0, 6);
  return {
    mode: "recommendations" as const,
    safePhrase: SAFE_PHRASE,
    reason: "Recomendações por filtro de base",
    items
  };
}
