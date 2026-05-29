import type { ProductRow } from "../../data/types";

export type CompareStatus = {
  canCompareDirectly: boolean;
  warnings: string[];
};

function asBool(v: unknown) {
  if (v === true) return true;
  if (v === false) return false;
  if (typeof v === "string") return v.trim().toLowerCase() === "true";
  return false;
}

function normalizeGroup(v: unknown) {
  const s = String(v ?? "").trim();
  return s.length > 0 ? s : "Não informado";
}

function isGenericGroup(group: string) {
  return group === "Não informado" || group.endsWith("_outros");
}

export function getCompareStatus(products: ProductRow[]): CompareStatus {
  const warnings: string[] = [];
  if (products.length < 2) warnings.push("selecione pelo menos 2 produtos para comparar");
  if (products.length > 4) warnings.push("limite máximo: 4 produtos");

  const groups = products.map((p) => normalizeGroup(p.comparison_group));
  const uniqueGroups = new Set(groups);
  const allSameGroup = uniqueGroups.size === 1;
  const anyGeneric = groups.some((g) => isGenericGroup(g));
  const allSubstitutes = products.every((p) => asBool(p.is_substitute_group));

  if (anyGeneric) warnings.push("grupo genérico: comparação direta não recomendada; compare com cautela");
  if (!allSameGroup) warnings.push("grupos diferentes: não são substitutos diretos");
  if (!allSubstitutes) warnings.push("um ou mais itens não são substitutos diretos");

  const canCompareDirectly = products.length >= 2 && products.length <= 4 && allSameGroup && !anyGeneric && allSubstitutes;
  return { canCompareDirectly, warnings };
}

