import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCompare } from "../app/state/CompareProvider";
import { useDataV1 } from "../app/state/DataProvider";
import { useFavorites } from "../app/state/FavoritesProvider";
import { Button } from "../components/Button";
import { ProductCard } from "../components/ProductCard";
import { ResultsList } from "../components/ResultsList";
import { SafetyBanner } from "../components/SafetyBanner";
import { getCompareStatus } from "../domain/compare/compareRules";
import type { ProductRow } from "../data/types";
import { getProductRouteId } from "../data/productIdentity";
import {
  formatCautionLevel,
  formatComparisonGroup,
  formatComplexityLevel,
  formatRoutineStep,
  formatTagList
} from "../presentation/formatters";

function uniqueStrings(values: string[]) {
  const set = new Set(values.filter((v) => v.length > 0 && v !== "Não informado"));
  return [...set].sort((a, b) => a.localeCompare(b));
}

function asText(v: unknown) {
  const s = String(v ?? "").trim();
  return s.length > 0 ? s : "Não informado";
}

function asReadableText(v: unknown) {
  const parts = formatTagList(v);
  return parts.length > 0 ? parts.join("; ") : "Não informado";
}

function isGenericComparisonGroup(value: unknown) {
  const raw = String(value ?? "").trim().toLowerCase();
  return raw.includes("_outros");
}

function explainDifferences(products: ProductRow[]) {
  const fields: Array<[string, (p: ProductRow) => string]> = [
    ["Marca", (p) => asText(p.Marca)],
    ["Faixa de preço", (p) => asReadableText((p as Record<string, unknown>)["price_tier"])],
    ["Etapa da rotina", (p) => formatRoutineStep(p.routine_step)],
    ["Necessidades relacionadas", (p) => asReadableText(p.need_tags)],
    ["Cautela", (p) => formatCautionLevel(p.caution_level)],
    ["Complexidade", (p) => formatComplexityLevel(p.complexity_level)],
    ["Grupo de comparação", (p) => formatComparisonGroup(p.comparison_group)]
  ];

  const lines: string[] = [];
  for (const [label, getter] of fields) {
    const uniq = uniqueStrings(products.map(getter));
    if (uniq.length > 1) lines.push(`${label}: ${uniq.join("; ")}`);
  }
  return lines.length > 0 ? lines : ["Diferenças principais não identificadas nos campos-chave."];
}

function friendlyWarning(text: string) {
  const t = text.trim().toLowerCase();
  if (t.includes("grupos diferentes")) {
    return "São relacionados por necessidades parecidas, mas não são substitutos diretos.";
  }
  if (t.includes("grupo genérico") || t.includes("grupo generico")) {
    return "Grupo genérico: comparar com cautela.";
  }
  return text;
}

function hashShortId(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

function uniqueProductId(products: ProductRow[], id: string) {
  const pid = String(id ?? "").trim();
  if (!pid) return "";
  let count = 0;
  for (const p of products) {
    const other = String((p as ProductRow & { product_id?: unknown }).product_id ?? "").trim();
    if (other === pid) count += 1;
    if (count > 1) return "";
  }
  return pid;
}

export function getProductCompareId(product: ProductRow, products: ProductRow[]) {
  const pid = String((product as ProductRow & { product_id?: unknown }).product_id ?? "").trim();
  const uniquePid = pid ? uniqueProductId(products, pid) : "";
  if (uniquePid) return uniquePid;

  const sourceHash = String((product as ProductRow & { source_hash?: unknown }).source_hash ?? "").trim();
  if (sourceHash) return sourceHash;

  const rid = getProductRouteId(product, products);
  if (rid && !rid.includes("%") && !rid.toLowerCase().includes("http")) return rid;

  const url = String(product.URL_produto ?? "").trim();
  return url ? `h-${hashShortId(url)}` : "";
}

export function findProductByCompareId(products: ProductRow[], id: string) {
  const cid = String(id ?? "").trim();
  if (!cid) return undefined;

  const byPid = products.filter((p) => String((p as ProductRow & { product_id?: unknown }).product_id ?? "").trim() === cid);
  if (byPid.length === 1 && uniqueProductId(products, cid)) return byPid[0];

  const byHash = products.filter((p) => String((p as ProductRow & { source_hash?: unknown }).source_hash ?? "").trim() === cid);
  if (byHash.length === 1) return byHash[0];

  if (cid.startsWith("h-")) {
    for (const p of products) {
      const url = String(p.URL_produto ?? "").trim();
      if (url && `h-${hashShortId(url)}` === cid) return p;
    }
  }

  return undefined;
}

export function Compare() {
  const nav = useNavigate();
  const location = useLocation();
  const dataState = useDataV1();
  const compare = useCompare();
  const favorites = useFavorites();
  const baseUrl = import.meta.env.BASE_URL ?? "/";
  const offline = typeof navigator !== "undefined" && navigator.onLine === false;

  const compareRef = useRef(compare);
  useEffect(() => {
    compareRef.current = compare;
  }, [compare]);

  const skipNextUrlWriteRef = useRef(false);
  const [urlNotice, setUrlNotice] = useState("");
  const urlNoticeTimeoutRef = useRef<number | null>(null);

  const tableRows = useMemo(() => {
    return [
      { label: "Marca", getter: (p: ProductRow) => asText(p.Marca) },
      { label: "Faixa de preço", getter: (p: ProductRow) => asReadableText((p as Record<string, unknown>)["price_tier"]) },
      { label: "Etapa da rotina", getter: (p: ProductRow) => formatRoutineStep(p.routine_step) },
      { label: "Necessidades relacionadas", getter: (p: ProductRow) => asReadableText(p.need_tags) },
      { label: "Grupo de comparação", getter: (p: ProductRow) => formatComparisonGroup(p.comparison_group) },
      { label: "Cautela", getter: (p: ProductRow) => formatCautionLevel(p.caution_level) },
      { label: "Complexidade", getter: (p: ProductRow) => formatComplexityLevel(p.complexity_level) }
    ] satisfies Array<{ label: string; getter: (p: ProductRow) => string }>;
  }, []);

  const selectedProducts = useMemo(() => {
    if (dataState.status !== "ready") return null;
    const byUrl = new Map(dataState.data.products.map((p) => [String(p.URL_produto ?? "").trim(), p] as const));
    return compare.selected.map((url) => byUrl.get(url)).filter(Boolean) as ProductRow[];
  }, [compare.selected, dataState]);

  const status = useMemo(() => (selectedProducts ? getCompareStatus(selectedProducts) : null), [selectedProducts]);

  const tableGridTemplateColumns = useMemo(() => {
    if (!selectedProducts || selectedProducts.length < 2) return undefined;
    const cols = selectedProducts.length;
    return `180px repeat(${cols}, minmax(220px, 1fr))`;
  }, [selectedProducts]);

  const hasGenericGroup = useMemo(() => {
    if (!selectedProducts) return false;
    return selectedProducts.some((p) => isGenericComparisonGroup(p.comparison_group));
  }, [selectedProducts]);

  const hasDifferentGroups = useMemo(() => {
    if (!selectedProducts) return false;
    const groups = uniqueStrings(selectedProducts.map((p) => formatComparisonGroup(p.comparison_group)));
    return groups.length > 1;
  }, [selectedProducts]);

  const relatedNeedsSummary = useMemo(() => {
    if (!selectedProducts) return "Confirmar no rótulo";
    const tags = uniqueStrings(selectedProducts.flatMap((p) => formatTagList(p.need_tags)));
    return tags.length > 0 ? tags.join("; ") : "Confirmar no rótulo";
  }, [selectedProducts]);

  useEffect(() => {
    if (dataState.status !== "ready") return;
    const params = new URLSearchParams(location.search);
    const raw = params.get("ids") ?? "";
    const ids = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (ids.length === 0) {
      if (urlNoticeTimeoutRef.current !== null) window.clearTimeout(urlNoticeTimeoutRef.current);
      urlNoticeTimeoutRef.current = null;
      setUrlNotice("");
      return;
    }

    const products = dataState.data.products;
    const desiredIds = ids.slice(0, 4);

    const desired: ProductRow[] = [];
    const invalid: string[] = [];
    for (const cid of desiredIds) {
      const p = findProductByCompareId(products, cid);
      if (p) desired.push(p);
      else invalid.push(cid);
    }

    if (invalid.length > 0) {
      if (urlNoticeTimeoutRef.current !== null) window.clearTimeout(urlNoticeTimeoutRef.current);
      setUrlNotice("Alguns itens da URL não foram reconhecidos e foram ignorados.");
      urlNoticeTimeoutRef.current = window.setTimeout(() => {
        setUrlNotice("");
      }, 6000);
    }

    const byIdentity = new Map(products.map((p) => [String(p.URL_produto ?? "").trim(), p] as const));
    const current = compareRef.current.selected.map((x) => byIdentity.get(x)).filter(Boolean) as ProductRow[];

    skipNextUrlWriteRef.current = true;

    const desiredSet = new Set(desired.map((p) => String(p.URL_produto ?? "").trim()));
    for (const p of current) {
      const key = String(p.URL_produto ?? "").trim();
      if (key && !desiredSet.has(key) && compareRef.current.has(p)) compareRef.current.toggle(p);
    }

    for (const p of desired) {
      if (!compareRef.current.has(p)) compareRef.current.toggle(p);
    }
  }, [dataState, location.search]);

  useEffect(() => {
    if (dataState.status !== "ready") return;
    if (skipNextUrlWriteRef.current) {
      skipNextUrlWriteRef.current = false;
      return;
    }

    const products = dataState.data.products;
    const byIdentity = new Map(products.map((p) => [String(p.URL_produto ?? "").trim(), p] as const));
    const current = compare.selected.map((x) => byIdentity.get(x)).filter(Boolean) as ProductRow[];
    const ids = current.map((p) => getProductCompareId(p, products)).filter(Boolean).slice(0, 4);
    const desiredSearch = ids.length > 0 ? `?ids=${ids.join(",")}` : "";
    if (location.search === desiredSearch) return;
    nav({ pathname: location.pathname, search: desiredSearch }, { replace: true });
  }, [compare.selected, dataState, location.pathname, location.search, nav]);

  return (
    <div className="screen compare-screen">
      <h1>Comparar</h1>
      <SafetyBanner />

      {dataState.status === "loading" || dataState.status === "idle" ? <div>Carregando base…</div> : null}
      {dataState.status === "error" ? (
        <div className="error">
          {offline
            ? "Sem conexão e ainda não há cache local. Conecte-se uma vez para abrir o app e baixar a base."
            : "Falha ao carregar base. Recarregue e confirme se os assets estão disponíveis."}
        </div>
      ) : null}

      {dataState.status === "ready" && selectedProducts ? (
        <>
          <div className="toolbar">
            <Button type="button" variant="secondary" onClick={() => nav("/consult")}>
              Voltar para consulta
            </Button>
            <Button type="button" variant="secondary" onClick={() => compare.clear()}>
              Limpar seleção
            </Button>
          </div>

          {urlNotice ? <div className="notice">{urlNotice}</div> : null}

          {selectedProducts.length < 2 ? (
            <div className="notice">
              Selecione pelo menos 2 produtos na tela de Consulta ou na Ficha para comparar (máximo 4).
            </div>
          ) : null}

          {status && status.warnings.length > 0 ? (
            <div className="warning">
              <div className="warning-title">Avisos</div>
              <ul className="list">
                {status.warnings.map((w) => (
                  <li key={w}>{friendlyWarning(w)}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {selectedProducts.length > 0 ? (
            <ResultsList
              title="Selecionados"
              shown={selectedProducts.length}
              total={selectedProducts.length}
              hasMore={false}
              onLoadMore={() => {}}
            >
              <div className="cards">
                {selectedProducts.map((product) => {
                  const rid = getProductRouteId(product, dataState.status === "ready" ? dataState.data.products : undefined);
                  return (
                    <ProductCard
                      key={product.URL_produto}
                      product={product}
                      data={dataState.data}
                      baseUrl={baseUrl}
                      isInCompare={compare.has(product)}
                      onToggleCompare={() => compare.toggle(product)}
                      isFavorite={favorites.has(product)}
                      onToggleFavorite={() => favorites.toggle(product)}
                      onOpen={() => nav(`/product/${rid}`)}
                    />
                  );
                })}
              </div>
            </ResultsList>
          ) : null}

          {selectedProducts.length >= 2 ? (
            <div className="compare-block">
              <h2>Comparação objetiva</h2>
              {selectedProducts.length >= 3 ? (
                <div className="notice">Para comparar com clareza, prefira 2 produtos por vez.</div>
              ) : null}

              <h2>Resumo rápido</h2>
              <div className="notice">
                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-item-label">Relacionados por</div>
                    <div className="info-item-value">{relatedNeedsSummary}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-item-label">Substitutos diretos?</div>
                    <div className="info-item-value">
                      {hasGenericGroup
                        ? "Grupo genérico: comparar com cautela."
                        : hasDifferentGroups
                          ? "Não. São relacionados por necessidades parecidas."
                          : "Provavelmente sim (confirmar no rótulo)."}
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-item-label">Diferenças</div>
                    <div className="info-item-value">{explainDifferences(selectedProducts)[0]}</div>
                  </div>
                </div>
              </div>

              <div className="table-scroll">
              <div className="table">
                <div className="table-row table-head" style={tableGridTemplateColumns ? { gridTemplateColumns: tableGridTemplateColumns } : undefined}>
                  <div className="cell cell-key" />
                  {selectedProducts.map((p) => {
                    const rid = getProductRouteId(p, dataState.data.products);
                    return (
                    <div className="cell" key={rid}>
                      {asText(p.Produto)}
                    </div>
                    );
                  })}
                </div>
                {tableRows.map((r) => (
                  <div
                    className="table-row"
                    key={r.label}
                    style={tableGridTemplateColumns ? { gridTemplateColumns: tableGridTemplateColumns } : undefined}
                  >
                    <div className="cell cell-key">{r.label}</div>
                    {selectedProducts.map((p) => {
                      const rid = getProductRouteId(p, dataState.data.products);
                      return (
                      <div className="cell" key={`${r.label}:${rid}`}>
                        {r.getter(p)}
                      </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              </div>

              <h2>Parecidos porque</h2>
              <p>
                {hasGenericGroup
                  ? "Grupo genérico: comparar com cautela."
                  : hasDifferentGroups
                    ? "São relacionados por necessidades parecidas, mas não são substitutos diretos."
                    : (() => {
                        const groups = uniqueStrings(selectedProducts.map((p) => formatComparisonGroup(p.comparison_group)));
                        return groups.length === 1 ? `Mesmo grupo: ${groups[0]}.` : "Confirmar no rótulo.";
                      })()}
              </p>

              <h2>Diferentes porque</h2>
              <ul className="list">
                {explainDifferences(selectedProducts).map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>

              <div className="notice">
                A comparação não substitui farmacêutico/dermatologista. Se o app indicar grupo genérico ou categorias diferentes, trate como
                não-substitutos diretos.
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
