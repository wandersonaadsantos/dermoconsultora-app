import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCompare } from "../../app/state/CompareProvider";
import { useDataV1 } from "../../app/state/DataProvider";
import { useFavorites } from "../../app/state/FavoritesProvider";
import { courseProductLinks } from "../../course/courseProductLinks";
import { filterProducts, type FilterState } from "../../data/facets";
import { getProductRouteId } from "../../data/productIdentity";
import { ProductCard } from "../ProductCard";

function toFilterState(partial: Partial<FilterState>): FilterState {
  return {
    query: partial.query ?? "",
    brand: partial.brand ?? "all",
    routine_step: partial.routine_step ?? "all",
    need_tag: partial.need_tag ?? "all",
    caution_level: partial.caution_level ?? "all",
    complexity_level: partial.complexity_level ?? "all",
    needsOnly: partial.needsOnly ?? false,
  };
}

export type RelatedProductsProps = {
  moduleId: string;
};

export function RelatedProducts(props: RelatedProductsProps) {
  const nav = useNavigate();
  const dataState = useDataV1();
  const compare = useCompare();
  const favorites = useFavorites();
  const baseUrl = import.meta.env.BASE_URL ?? "/";

  const sections = courseProductLinks[props.moduleId] ?? [];

  const filteredBySection = useMemo(() => {
    if (dataState.status !== "ready") return null;
    const all = dataState.data.products;
    return sections.map((s) => {
      const items = filterProducts(all, toFilterState(s.filter));
      return { title: s.title, items: items.slice(0, s.limit ?? 8) };
    });
  }, [dataState, sections]);

  if (sections.length === 0) return null;

  return (
    <div>
      <h2>Produtos reais (exemplos)</h2>
      <div className="hint" style={{ marginBottom: 12 }}>
        Exemplos da base para você abrir ficha e comparar. Se faltar uma informação do produto, confirmar no rótulo antes de orientar.
      </div>
      {dataState.status === "loading" || dataState.status === "idle" ? <div>Carregando base…</div> : null}
      {dataState.status === "error" ? (
        <div className="error">Falha ao carregar base. Recarregue e confirme se os assets estão disponíveis.</div>
      ) : null}
      {dataState.status === "ready" && filteredBySection ? (
        filteredBySection.map((s) => (
          <div key={s.title} style={{ marginBottom: 16 }}>
            <div className="card-subtitle" style={{ marginBottom: 8 }}>
              {s.title}
            </div>
            {s.items.length === 0 ? (
              <div className="notice">Nenhum exemplo encontrado com o filtro atual.</div>
            ) : (
              <div className="cards">
                {s.items.map((p) => {
                  const rid = getProductRouteId(p, dataState.data.products);
                  return (
                    <ProductCard
                      key={String(p.URL_produto ?? "")}
                      product={p}
                      data={dataState.data}
                      baseUrl={baseUrl}
                      isInCompare={compare.has(p)}
                      onToggleCompare={() => compare.toggle(p)}
                      isFavorite={favorites.has(p)}
                      onToggleFavorite={() => favorites.toggle(p)}
                      onOpen={() => nav(`/product/${rid}`)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ))
      ) : null}
    </div>
  );
}
