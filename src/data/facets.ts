import type { ProductRow } from "./types";
import { normalizeForSearch } from "./normalize";
import { searchProducts } from "./search";

export type FilterState = {
  query: string;
  brand: string | "all";
  routine_step: string | "all";
  need_tag: string | "all";
  caution_level: string | "all";
  complexity_level: string | "all";
  needsOnly: boolean;
};

function splitTags(raw: string) {
  return raw
    .split(/[|/]/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && s !== "Não informado");
}

function hasNeedTag(row: ProductRow, tag: string) {
  const raw = String(row.need_tags ?? "");
  return splitTags(raw).includes(tag);
}

export function filterProducts(rows: ProductRow[], f: FilterState) {
  const q = normalizeForSearch(f.query);

  const filtered = rows.filter((r) => {
    if (f.needsOnly) {
      const tags = String(r.need_tags ?? "").trim();
      if (!tags || tags.toLowerCase() === "não informado") return false;
    }
    if (f.brand !== "all" && String(r.Marca ?? "") !== f.brand) return false;
    if (f.routine_step !== "all" && String(r.routine_step ?? "") !== f.routine_step) return false;
    if (f.caution_level !== "all" && String(r.caution_level ?? "") !== f.caution_level) return false;
    if (f.complexity_level !== "all" && String(r.complexity_level ?? "") !== f.complexity_level) return false;
    if (f.need_tag !== "all" && !hasNeedTag(r, f.need_tag)) return false;
    return true;
  });

  if (q.length === 0) return filtered;
  return searchProducts(filtered, f.query).items;
}

export function uniqueBrands(rows: ProductRow[]) {
  const set = new Set<string>();
  for (const r of rows) {
    const v = String(r.Marca ?? "").trim();
    if (v && v !== "Não informado") set.add(v);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function uniqueNeedTags(rows: ProductRow[]) {
  const set = new Set<string>();
  for (const r of rows) {
    for (const t of splitTags(String(r.need_tags ?? ""))) set.add(t);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}
