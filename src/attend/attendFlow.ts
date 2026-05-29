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

function makeFilterState(): FilterState {
  return {
    query: "",
    brand: "all",
    routine_step: "all",
    need_tag: "all",
    caution_level: "all",
    complexity_level: "all",
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

  let items = filterProducts(allProducts, f);
  // Filtro de face steps só se aplica quando não houve override de categoria
  if (answers.area === "Rosto" && !usedStepOverride) {
    items = items.filter((p) => FACE_STEPS.has(normalizeRoutineStep(p.routine_step)));
  }

  // Fallback: se busca textual + área retornou vazio, tenta sem área.
  if (items.length === 0 && !usedStepOverride && f.routine_step !== "all") {
    items = filterProducts(allProducts, { ...f, routine_step: "all" });
  }

  items = items.slice(0, 8);
  return {
    mode: "recommendations" as const,
    safePhrase: SAFE_PHRASE,
    reason: "Recomendações por filtro de base",
    items
  };
}
