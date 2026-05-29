import type { ProductRow } from "../data/types";

const MISSING_VALUES = new Set(["", "não informado", "nao informado", "undefined", "null", "-"]);

const FIELD_LABELS: Record<string, string> = {
  URL_produto: "Link do produto",
  Data_coleta: "Data de coleta",
  Status_coleta: "Status da coleta",
  source_hash: "Hash da fonte",
  product_id: "ID do produto",
  data_quality_score: "Qualidade dos dados",
  data_quality_notes: "Observações de qualidade",
  need_tags: "Necessidades relacionadas",
  routine_step: "Etapa da rotina",
  comparison_group: "Grupo de comparação",
  caution_level: "Cautela",
  complexity_level: "Complexidade",
  categoria_derivada: "Categoria interpretada",
  finalidade_derivada: "Finalidade interpretada",
  indicacao_derivada: "Indicação interpretada",
  textura_derivada: "Textura interpretada",
  cautela_derivada: "Cautela interpretada",
  price_tier: "Faixa de preço",
  drogasil_product_code: "Código Drogasil",
  drogasil_product_code_source: "Origem do código",
  manufacturer: "Fabricante",
  quantity: "Quantidade",
  site_description: "Descrição (site)",
  site_benefits: "Benefícios (site)",
  site_how_to_use: "Modo de uso (site)",
  site_warnings: "Advertências (site)",
  site_characteristics: "Características (site)",
  factual_capture_status: "Status da captura factual",
  factual_capture_notes: "Notas da captura factual"
};

const ROUTINE_STEPS: Record<string, string> = {
  limpeza: "Limpeza",
  hidratacao: "Hidratação",
  hidratação: "Hidratação",
  protecao_solar: "Proteção solar",
  "proteção solar": "Proteção solar",
  tratamento_cosmetico: "Tratamento cosmético",
  "tratamento cosmético": "Tratamento cosmético",
  tratamento: "Tratamento cosmético",
  outros: "Outros cuidados"
};

const COMPARISON_GROUPS: Record<string, string> = {
  acne_antiacne: "Produtos relacionados a acne/antiacne",
  gel_limpeza_facial: "Produtos de limpeza facial",
  limpeza_facial: "Produtos de limpeza facial",
  hidratante_facial: "Hidratantes faciais",
  hidratantes: "Hidratantes",
  protecao_solar: "Protetores solares",
  protetor_solar: "Protetores solares",
  protetor_solar_facial: "Protetores solares faciais",
  tratamento_cosmetico: "Tratamentos cosméticos",
  tratamento_cosmetico_outros: "Tratamentos cosméticos diversos"
};

const CAUTION_LEVELS: Record<string, string> = {
  baixo: "Baixa cautela",
  baixa: "Baixa cautela",
  medio: "Cautela moderada",
  médio: "Cautela moderada",
  moderado: "Cautela moderada",
  moderada: "Cautela moderada",
  media: "Cautela moderada",
  média: "Cautela moderada",
  alto: "Alta cautela",
  alta: "Alta cautela"
};

const COMPLEXITY_LEVELS: Record<string, string> = {
  iniciante: "Iniciante",
  basico: "Uso simples",
  básico: "Uso simples",
  moderado: "Atenção moderada",
  moderada: "Atenção moderada",
  intermediario: "Atenção moderada",
  intermediário: "Atenção moderada",
  avancado: "Requer mais atenção",
  avançado: "Requer mais atenção"
};

export function isMissing(value: unknown) {
  const text = String(value ?? "").trim().toLowerCase();
  return MISSING_VALUES.has(text);
}

export function productValue(product: ProductRow, keys: string[]) {
  const row = product as Record<string, unknown>;
  for (const key of keys) {
    if (!isMissing(row[key])) return row[key];
  }
  return null;
}

export function formatFieldLabel(label: string) {
  if (FIELD_LABELS[label]) return FIELD_LABELS[label];
  return label
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

function humanizeRaw(value: string) {
  const normalized = value.trim().replace(/_/g, " ");
  return normalized.replace(/^\w/, (letter) => letter.toUpperCase());
}

export function formatTagList(value: unknown) {
  if (isMissing(value)) return [];
  return String(value)
    .split(/[|/]/g)
    .map((item) => humanizeRaw(item))
    .filter((item) => item.length > 0);
}

export function formatRoutineStep(value: unknown) {
  if (isMissing(value)) return "Confirmar no rótulo";
  const key = String(value).trim().toLowerCase().replace(/\s+/g, "_");
  return ROUTINE_STEPS[key] ?? humanizeRaw(String(value));
}

export function formatComparisonGroup(value: unknown) {
  if (isMissing(value)) return "Confirmar categoria";
  const key = String(value).trim().toLowerCase();
  return COMPARISON_GROUPS[key] ?? humanizeRaw(String(value));
}

export function formatCautionLevel(value: unknown) {
  if (isMissing(value)) return "Cautela não informada";
  const key = String(value).trim().toLowerCase();
  return CAUTION_LEVELS[key] ?? humanizeRaw(String(value));
}

export function formatComplexityLevel(value: unknown) {
  if (isMissing(value)) return "Complexidade não informada";
  const key = String(value).trim().toLowerCase();
  return COMPLEXITY_LEVELS[key] ?? humanizeRaw(String(value));
}

export function formatDataQualityNotes(value: unknown) {
  return formatTagList(value).map((note) =>
    note
      .replace(/ derivada calculada por regra/gi, " interpretada pelo app")
      .replace(/ factual ausente/gi, " não encontrada na base")
      .replace(/Categoria derivada/gi, "Categoria interpretada")
      .replace(/Finalidade derivada/gi, "Finalidade interpretada")
      .replace(/Textura derivada/gi, "Textura interpretada")
      .replace(/Indicação derivada/gi, "Indicação interpretada")
      .replace(/Cautela derivada/gi, "Cautela interpretada")
  );
}

export function formatPrice(value: unknown) {
  if (isMissing(value)) return "Não encontrado na base";
  const text = String(value).trim();
  const numeric = Number(text.replace(/[^\d,.-]/g, "").replace(",", "."));
  if (Number.isFinite(numeric) && numeric > 0) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(numeric);
  }
  return text;
}

export function formatDrogasilProductCode(value: unknown) {
  if (isMissing(value)) return "Não encontrado na base";
  const text = String(value).trim();
  const digits = text.replace(/\D/g, "");
  return digits.length > 0 ? digits : text;
}

export function formatCollectedDate(value: unknown) {
  if (isMissing(value)) return "Não encontrada na base";
  const date = new Date(String(value));
  if (!Number.isFinite(date.getTime())) return String(value);
  return date.toLocaleDateString("pt-BR");
}

export function formatStatus(value: unknown) {
  if (isMissing(value)) return "Status não informado";
  if (String(value).trim().toLowerCase() === "processed") {
    return "Produto coletado com sucesso";
  }
  return humanizeRaw(String(value));
}

export function formatDataQualityScore(value: unknown) {
  if (isMissing(value)) return "Qualidade dos dados não informada";
  return `${String(value).trim()} de 100`;
}

export function formatSafeSummary(product: ProductRow) {
  const routine = formatRoutineStep(product.routine_step).toLowerCase();
  const needs = formatTagList(product.need_tags);
  const needsText = needs.length > 0 ? ` para ${needs.join(" e ").toLowerCase()}` : "";
  return `Produto com proposta de ${routine}${needsText}. Confirmar modo de uso no rótulo antes de orientar.`;
}
