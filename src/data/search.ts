import type { ProductRow } from "./types";
import { normalizeForSearch } from "./normalize";

const STOPWORDS = new Set(["de", "da", "do", "das", "dos", "para", "com", "e"]);

function tokenize(input: string) {
  const norm = normalizeForSearch(input).replace(/[^a-z0-9\s]/g, " ");
  const tokens = norm
    .split(/\s+/g)
    .map((t) => t.trim())
    .filter(Boolean)
    .filter((t) => !STOPWORDS.has(t));

  return tokens.filter((t) => t.length >= 2 || /^\d+$/.test(t));
}

function buildSearchText(p: ProductRow) {
  const r = p as Record<string, unknown>;
  return [
    p.Produto,
    p.Marca,
    p.URL_produto,
    p.routine_step,
    p.need_tags,
    p.comparison_group,
    r["comparison_tags"],
    r["price_tier"],
    r["categoria_origem_label"],
    r["Categoria"]
  ]
    .map((x) => String(x ?? "").trim())
    .filter((x) => x.length > 0 && x !== "Não informado")
    .join(" ");
}

function tokenMatches(hay: string, token: string) {
  if (/^\d+$/.test(token)) return hay.includes(token);
  if (hay.includes(token)) return true;
  if (token.length >= 4) {
    const re = new RegExp(`\\b${token}`);
    return re.test(hay);
  }
  return false;
}

function scoreProduct(p: ProductRow, tokens: string[], rawQuery: string) {
  const normQuery = normalizeForSearch(rawQuery).replace(/[^a-z0-9\s]/g, " ").trim();
  const name = normalizeForSearch(`${String(p.Produto ?? "")} ${String(p.Marca ?? "")}`).replace(/[^a-z0-9\s]/g, " ");
  const full = normalizeForSearch(buildSearchText(p)).replace(/[^a-z0-9\s]/g, " ");

  let score = 0;
  if (normQuery.length > 0 && name.includes(normQuery)) score += 1000;

  let matched = 0;
  let matchedInName = 0;
  for (const t of tokens) {
    const inName = tokenMatches(name, t);
    const inFull = inName || tokenMatches(full, t);
    if (inFull) matched += 1;
    if (inName) matchedInName += 1;
  }

  score += matchedInName * 30;
  score += matched * 10;
  return { score, matched, matchedInName };
}

export type SearchResult = {
  items: ProductRow[];
};

export function searchProducts(products: ProductRow[], query: string): SearchResult {
  const tokens = tokenize(query);
  if (tokens.length === 0) return { items: [] };

  const scored = products
    .map((p) => ({ p, s: scoreProduct(p, tokens, query) }))
    .filter(({ s }) => {
      const all = s.matched === tokens.length;
      const majority = tokens.length >= 3 ? s.matched >= Math.ceil(tokens.length * 0.7) : false;
      const strongName = s.matchedInName >= Math.min(2, tokens.length);
      return all || (majority && strongName);
    })
    .sort((a, b) => b.s.score - a.s.score);

  return { items: scored.map((x) => x.p) };
}

