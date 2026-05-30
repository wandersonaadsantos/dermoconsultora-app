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

// Regiões do corpo que não são o rosto. Numa consulta de rosto, um produto
// explicitamente de outra região (mãos, pés, corpo, cabelo, pernas) não faz
// sentido — mesmo quando a base o etiqueta com uma etapa de rotina facial
// (dado impreciso). Em vez de caçar termo a termo, tratamos a classe inteira.
const NON_FACE_REGION = /\b(m[aã]os|p[eé]s|corpo|corporal|capilar|cabelos?|pernas?)\b/i;
const FACE_TERMS = /\b(facial|rosto|face)\b/i;

/** Produto claramente de região não-facial (e que não cita o rosto). */
function isOffFaceRegion(name: string): boolean {
  return NON_FACE_REGION.test(name) && !FACE_TERMS.test(name);
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

  let items = constrainToArea(filterProducts(allProducts, f)).filter(isRecommendable);

  // No rosto, descarta produtos explicitamente de outra região do corpo
  // (mãos, pés, corpo, cabelo…) que escaparam por etiqueta de rotina imprecisa.
  if (answers.area === "Rosto" && !usedStepOverride) {
    items = items.filter((p) => !isOffFaceRegion(String(p.Produto ?? "")));
  }

  // Fallback de área: se a área escolhida não produziu resultado, amplia para
  // todas as áreas (mantém o recorte de necessidade/preferência e a relevância).
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
