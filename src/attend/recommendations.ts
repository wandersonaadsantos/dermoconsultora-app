import type { ProductRow } from "../data/types";
import type { AttendState } from "./flow";

function splitTags(raw: string) {
  return raw
    .split(/[|/]/g)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0 && s !== "não informado" && s !== "nao informado");
}

function hasAnyNeedTag(row: ProductRow, tags: string[]) {
  if (tags.length === 0) return true;
  const rowTags = splitTags(String(row.need_tags ?? ""));
  for (const tag of tags) {
    const t = tag.trim().toLowerCase();
    if (t.length > 0 && rowTags.includes(t)) return true;
  }
  return false;
}

export function filterProductsByAnyNeedTag(rows: ProductRow[], tags: string[]) {
  return rows.filter((r) => hasAnyNeedTag(r, tags));
}

export type RecommendationGate = { blocked: true; reason: "alert" } | { blocked: false; reason: null };

export function getRecommendationGate(state: AttendState): RecommendationGate {
  if (state.hasAlert) {
    return { blocked: true, reason: "alert" };
  }
  return { blocked: false, reason: null };
}
