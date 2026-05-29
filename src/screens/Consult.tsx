import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCompare } from "../app/state/CompareProvider";
import { useDataV1 } from "../app/state/DataProvider";
import { useFavorites } from "../app/state/FavoritesProvider";
import { getStoredJson, setStoredJson } from "../app/state/persistence";
import { Button } from "../components/Button";
import { Chip } from "../components/Chip";
import { FieldGroup } from "../components/FieldGroup";
import { ProductCard } from "../components/ProductCard";
import { ResultsList } from "../components/ResultsList";
import { SafetyBanner } from "../components/SafetyBanner";
import type { FilterState } from "../data/facets";
import { filterProducts, uniqueBrands, uniqueNeedTags } from "../data/facets";
import { paginateByOffset } from "../data/pagination";
import { getProductRouteId } from "../data/productIdentity";
import {
  formatCautionLevel,
  formatComplexityLevel,
  formatRoutineStep,
  formatTagList
} from "../presentation/formatters";

function uniqueValues(rows: Array<Record<string, unknown>>, key: string) {
  const set = new Set<string>();
  for (const r of rows) {
    const v = String(r[key] ?? "").trim();
    if (v && v !== "Não informado") set.add(v);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

const PAGE_SIZE = 24;
const DEFAULT_FILTERS: FilterState = {
  query: "",
  brand: "all",
  routine_step: "all",
  need_tag: "all",
  caution_level: "all",
  complexity_level: "all",
  needsOnly: false
};

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [delayMs, value]);
  return debounced;
}

export function Consult() {
  const nav = useNavigate();
  const location = useLocation();
  const dataState = useDataV1();
  const compare = useCompare();
  const favorites = useFavorites();

  const urlSyncEnabledRef = useRef(false);

  const [filters, setFilters] = useState<FilterState>(() => getStoredJson<FilterState>("consult_filters", DEFAULT_FILTERS));
  const debouncedQuery = useDebouncedValue(filters.query, 150);

  const [shown, setShown] = useState(PAGE_SIZE);

  const updateFilters = (next: FilterState | ((prev: FilterState) => FilterState)) => {
    urlSyncEnabledRef.current = true;
    setFilters(next);
  };

  useEffect(() => {
    setShown(PAGE_SIZE);
  }, [filters]);

  useEffect(() => {
    setStoredJson("consult_filters", filters);
  }, [filters]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hasAny = params.has("q") || params.has("needsOnly") || params.has("brand") || params.has("routineStep") || params.has("need");
    if (!hasAny) return;

    urlSyncEnabledRef.current = true;

    const q = params.get("q") ?? "";
    const needsOnly = params.get("needsOnly") === "true";
    const brand = params.get("brand") ?? DEFAULT_FILTERS.brand;
    const routineStep = params.get("routineStep") ?? DEFAULT_FILTERS.routine_step;
    const need = params.get("need") ?? DEFAULT_FILTERS.need_tag;

    setFilters((prev) => {
      const next = {
        ...prev,
        query: q,
        needsOnly,
        brand: brand as FilterState["brand"],
        routine_step: routineStep as FilterState["routine_step"],
        need_tag: need as FilterState["need_tag"]
      };

      const same = JSON.stringify(prev) === JSON.stringify(next);
      return same ? prev : next;
    });
  }, [location.search]);

  useEffect(() => {
    if (!urlSyncEnabledRef.current) return;

    const params = new URLSearchParams();
    if (filters.query.trim().length > 0) params.set("q", filters.query.trim());
    if (filters.needsOnly) params.set("needsOnly", "true");
    if (filters.brand !== DEFAULT_FILTERS.brand) params.set("brand", String(filters.brand));
    if (filters.routine_step !== DEFAULT_FILTERS.routine_step) params.set("routineStep", String(filters.routine_step));
    if (filters.need_tag !== DEFAULT_FILTERS.need_tag) params.set("need", String(filters.need_tag));

    const desired = params.toString();
    const desiredSearch = desired.length > 0 ? `?${desired}` : "";
    if (location.search === desiredSearch) return;

    nav({ pathname: location.pathname, search: desiredSearch }, { replace: true });
  }, [filters, location.pathname, location.search, nav]);

  const baseUrl = import.meta.env.BASE_URL ?? "/";

  const view = useMemo(() => {
    if (dataState.status !== "ready") return null;

    const all = dataState.data.products;
    const filtered = filterProducts(all, { ...filters, query: debouncedQuery });
    const page = paginateByOffset(filtered, { offset: 0, limit: shown });

    const brands = uniqueBrands(all);
    const needTags = uniqueNeedTags(all);
    const routineSteps = uniqueValues(all as unknown as Array<Record<string, unknown>>, "routine_step");
    const cautionLevels = uniqueValues(all as unknown as Array<Record<string, unknown>>, "caution_level");
    const complexityLevels = uniqueValues(all as unknown as Array<Record<string, unknown>>, "complexity_level");

    return { all, filtered, page, brands, needTags, routineSteps, cautionLevels, complexityLevels };
  }, [dataState, debouncedQuery, filters, shown]);

  const originText = useMemo(() => {
    if (dataState.status !== "ready") return "";
    const raw = String(dataState.data.manifest.created_at ?? "").trim();
    const d = raw ? new Date(raw) : null;
    const date = d && Number.isFinite(d.getTime()) ? d.toLocaleDateString("pt-BR") : "";
    return date.length > 0
      ? `Base coletada do site em ${date}. Isso não garante estoque na loja física. Confirme disponibilidade e rótulo antes de orientar.`
      : "Base coletada do site. Isso não garante estoque na loja física. Confirme disponibilidade e rótulo antes de orientar.";
  }, [dataState]);

  return (
    <div className="screen">
      <h1>Consulta</h1>

      {dataState.status === "loading" || dataState.status === "idle" ? <div>Carregando base…</div> : null}
      {dataState.status === "error" ? (
        <div className="error">
          {typeof navigator !== "undefined" && navigator.onLine === false
            ? "Sem conexão e ainda não há cache local. Conecte-se uma vez para abrir o app e baixar a base."
            : "Falha ao carregar base. Confirme se os assets estão disponíveis em public/data/v1/ e recarregue."}
        </div>
      ) : null}

      {dataState.status === "ready" && view ? (
        <>
          <SafetyBanner />
          <SafetyBanner kind="origin" text={originText} />
          <div className="toolbar">
            <Button type="button" variant="primary" onClick={() => nav("/compare")}>
              Ir para comparação ({compare.selected.length})
            </Button>
            <Button type="button" variant="secondary" onClick={() => nav("/safety")}>
              Checklist de segurança
            </Button>
          </div>

          <div className="consult-search">
            <FieldGroup label="Buscar">
              <input
                className="input"
                value={filters.query}
                onChange={(e) => updateFilters((p) => ({ ...p, query: e.target.value }))}
                placeholder="nome do produto ou marca"
              />
              <div className="hint">Digite nome, marca ou parte do produto.</div>
            </FieldGroup>
          </div>

          <div className="consult-advanced">
            <h2>Filtros avançados</h2>
            <div className="filters">
              <FieldGroup label="Marca">
                <select
                  className="input"
                  value={filters.brand}
                  onChange={(e) => updateFilters((p) => ({ ...p, brand: e.target.value as FilterState["brand"] }))}
                >
                  <option value="all">Todas</option>
                  {view.brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </FieldGroup>

              <FieldGroup label="Etapa de rotina">
                <select
                  className="input"
                  value={filters.routine_step}
                  onChange={(e) =>
                    updateFilters((p) => ({ ...p, routine_step: e.target.value as FilterState["routine_step"] }))
                  }
                >
                  <option value="all">Todas</option>
                  {view.routineSteps.map((v) => (
                    <option key={v} value={v}>
                      {formatRoutineStep(v)}
                    </option>
                  ))}
                </select>
              </FieldGroup>

              <FieldGroup label="Necessidade">
                <select
                  className="input"
                  value={filters.need_tag}
                  onChange={(e) => updateFilters((p) => ({ ...p, need_tag: e.target.value as FilterState["need_tag"] }))}
                >
                  <option value="all">Todas</option>
                  {view.needTags.map((t) => (
                    <option key={t} value={t}>
                      {formatTagList(t)[0] ?? "Confirmar no rótulo"}
                    </option>
                  ))}
                </select>
              </FieldGroup>

              <FieldGroup label="Cautela">
                <select
                  className="input"
                  value={filters.caution_level}
                  onChange={(e) =>
                    updateFilters((p) => ({ ...p, caution_level: e.target.value as FilterState["caution_level"] }))
                  }
                >
                  <option value="all">Todas</option>
                  {view.cautionLevels.map((v) => (
                    <option key={v} value={v}>
                      {formatCautionLevel(v)}
                    </option>
                  ))}
                </select>
              </FieldGroup>

              <FieldGroup label="Complexidade">
                <select
                  className="input"
                  value={filters.complexity_level}
                  onChange={(e) =>
                    updateFilters((p) => ({ ...p, complexity_level: e.target.value as FilterState["complexity_level"] }))
                  }
                >
                  <option value="all">Todas</option>
                  {view.complexityLevels.map((v) => (
                    <option key={v} value={v}>
                      {formatComplexityLevel(v)}
                    </option>
                  ))}
                </select>
              </FieldGroup>

              <div className="chips">
                <Chip selected={filters.needsOnly} onClick={() => updateFilters((p) => ({ ...p, needsOnly: !p.needsOnly }))}>
                  Só produtos com necessidade identificada
                </Chip>
                <Button type="button" variant="secondary" onClick={() => updateFilters(DEFAULT_FILTERS)}>
                  Limpar filtros
                </Button>
              </div>
            </div>
          </div>

          {view.page.total === 0 ? (
            <div className="notice">
              Não encontrei na base atual. Tente buscar por marca, linha ou parte do nome.
            </div>
          ) : (
            <ResultsList
              title="Resultados"
              shown={view.page.items.length}
              total={view.page.total}
              hasMore={view.page.nextOffset !== null}
              onLoadMore={() => setShown((p) => p + PAGE_SIZE)}
            >
              <div className="cards">
                {view.page.items.map((product) => {
                  const rid = getProductRouteId(product, view.all);
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
          )}
        </>
      ) : null}
    </div>
  );
}
