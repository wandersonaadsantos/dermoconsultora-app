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

  if (answers.needKind === "tag") {
    f.need_tag = answers.need;
  } else {
    f.query = answers.need;
  }

  if (answers.preference === "uso-simples") {
    f.complexity_level = "iniciante";
  }

  if (answers.preference === "mais-suave") {
    f.caution_level = "baixo";
  }

  let items = filterProducts(allProducts, f);
  if (answers.area === "Rosto") {
    items = items.filter((p) => FACE_STEPS.has(normalizeRoutineStep(p.routine_step)));
  }
  items = items.slice(0, 8);
  return {
    mode: "recommendations" as const,
    safePhrase: SAFE_PHRASE,
    reason: "Recomendações por filtro de base",
    items
  };
}
