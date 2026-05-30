import type { ProductRow } from "./types";

function splitTags(raw: unknown) {
  const t = String(raw ?? "").trim();
  if (!t || t.toLowerCase() === "não informado" || t.toLowerCase() === "nao informado") return [];
  return t
    .split(/[|/]/g)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0);
}

function isOutrosGroup(value: unknown) {
  const t = String(value ?? "").trim().toLowerCase();
  return t.endsWith("_outros");
}

function isMissing(value: unknown) {
  const t = String(value ?? "").trim().toLowerCase();
  return t.length === 0 || t === "não informado" || t === "nao informado";
}

type SimilarReason =
  | "Mesmo grupo de comparação"
  | "Mesma etapa da rotina"
  | "Necessidades parecidas"
  | "Mesma marca"
  | "Faixa de preço parecida";

export type SimilarProduct = {
  product: ProductRow;
  reason: SimilarReason;
  score: number;
};

export type SimilarProductsResult = {
  items: SimilarProduct[];
  warningOutros: boolean;
};

function reasonFromMatch(match: {
  group: boolean;
  step: boolean;
  needs: boolean;
  brand: boolean;
  price: boolean;
}): SimilarReason {
  if (match.group) return "Mesmo grupo de comparação";
  if (match.step) return "Mesma etapa da rotina";
  if (match.needs) return "Necessidades parecidas";
  if (match.brand) return "Mesma marca";
  return "Faixa de preço parecida";
}

export function getSimilarProducts(all: ProductRow[], current: ProductRow, limit = 8): SimilarProductsResult {
  const currentUrl = String(current.URL_produto ?? "").trim();
  const group = String(current.comparison_group ?? "").trim();
  const step = String(current.routine_step ?? "").trim();
  const brand = String(current.Marca ?? "").trim();
  const priceTier = String(current.price_tier ?? "").trim();
  const needs = new Set(splitTags(current.need_tags));

  const outros = isOutrosGroup(group);

  const scored: SimilarProduct[] = [];

  for (const p of all) {
    const url = String(p.URL_produto ?? "").trim();
    if (!url || url === currentUrl) continue;

    const matchGroup = !outros && !isMissing(group) && String(p.comparison_group ?? "").trim() === group;
    const matchStep = !isMissing(step) && String(p.routine_step ?? "").trim() === step;

    const pNeeds = splitTags(p.need_tags);
    let overlap = 0;
    for (const t of pNeeds) if (needs.has(t)) overlap++;
    const matchNeeds = overlap > 0;

    const matchBrand = !isMissing(brand) && String(p.Marca ?? "").trim() === brand;
    const matchPrice = !isMissing(priceTier) && String(p.price_tier ?? "").trim() === priceTier;

    let score = 0;
    if (matchGroup) score += 100;
    if (matchStep) score += 50;
    if (matchNeeds) score += 30 + overlap;
    if (matchBrand) score += 10;
    if (matchPrice) score += 5;

    if (score <= 0) continue;

    scored.push({
      product: p,
      reason: reasonFromMatch({ group: matchGroup, step: matchStep, needs: matchNeeds, brand: matchBrand, price: matchPrice }),
      score
    });
  }

  scored.sort((a, b) => b.score - a.score);

  return { items: scored.slice(0, Math.max(0, limit)), warningOutros: outros };
}

