import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCompare } from "../app/state/CompareProvider";
import { useDataV1 } from "../app/state/DataProvider";
import { useFavorites } from "../app/state/FavoritesProvider";
import { Button } from "../components/Button";
import { CourseModuleCard } from "../components/course/CourseModuleCard";
import { CourseSection } from "../components/course/CourseSection";
import { ProductCard } from "../components/ProductCard";
import { ResultsList } from "../components/ResultsList";
import { SafetyBanner } from "../components/SafetyBanner";
import { courseModules } from "../course/courseModules";
import type { CourseModule } from "../course/courseTypes";
import { getProductRouteId } from "../data/productIdentity";
import { useReadingProgress } from "../study/useReadingProgress";

const recommendedPracticeSequenceModuleIds = [
  "atendimento-consultivo",
  "leitura-rotulo",
  "tipos-condicoes-pele",
  "skincare-basico",
  "protecao-solar",
  "categorias-de-loja",
  "comparar-parecidos",
  "treino-de-fala-objecoes",
  "simulacoes-atendimento",
  "checklist-rapido"
] as const;

export function Course() {
  const nav = useNavigate();
  const dataState = useDataV1();
  const compare = useCompare();
  const favorites = useFavorites();
  const reading = useReadingProgress();
  const baseUrl = import.meta.env.BASE_URL ?? "/";
  const offline = typeof navigator !== "undefined" && navigator.onLine === false;

  const totalModules = courseModules.length;
  const readCount = useMemo(() => {
    const validIds = new Set(courseModules.map((m) => m.id));
    return reading.readModuleIds.filter((id) => validIds.has(id)).length;
  }, [reading.readModuleIds]);

  const favoriteProducts = useMemo(() => {
    if (dataState.status !== "ready") return null;
    const byUrl = new Map(dataState.data.products.map((p) => [String(p.URL_produto ?? "").trim(), p] as const));
    return favorites.favorites.map((url) => byUrl.get(url)).filter(Boolean);
  }, [dataState, favorites.favorites]);

  const recommendedPracticeSequence = useMemo(() => {
    const byId = new Map(courseModules.map((m) => [m.id, m] as const));
    return recommendedPracticeSequenceModuleIds
      .map((id) => byId.get(id))
      .filter((m): m is CourseModule => m != null);
  }, []);

  return (
    <div className="screen study-screen screen-stack">
      <h1>Formação</h1>

      <SafetyBanner text="Use este app como apoio no atendimento. Confira o rótulo e chame o farmacêutico em caso de dúvida ou sinal de alerta." />

      <div className="notice course-reading-summary">{`${readCount} de ${totalModules} módulos lidos`}</div>

      <div className="toolbar">
        <Button type="button" variant="primary" onClick={() => nav("/consult")}>
          Consultar produtos
        </Button>
        <Button type="button" variant="secondary" onClick={() => nav("/compare")}>
          Comparar produtos
        </Button>
        <Button type="button" variant="secondary" onClick={() => nav("/safety")}>
          Checklist rápido
        </Button>
      </div>

      <CourseSection
        title="Sequência recomendada (prática)"
        description="Se você quer treinar para o balcão com foco no essencial, siga esta ordem."
      >
        <div className="toolbar">
          <Button type="button" variant="secondary" onClick={() => nav("/study/atendimento-consultivo")}>
            Começar pela sequência
          </Button>
        </div>
        <ol>
          {recommendedPracticeSequence.map((m) => (
            <li key={m.id}>
              <div className="course-module-item">
                <CourseModuleCard module={m} isRead={reading.isRead(m.id)} onOpen={() => nav(`/study/${m.id}`)} />
              </div>
            </li>
          ))}
        </ol>
      </CourseSection>

      <CourseSection
        title="Trilha de formação"
        description={`${courseModules.length} módulos curtos para orientar com segurança no balcão. Abra um módulo, faça o exercício e use os exemplos de produtos reais quando aparecerem.`}
      >
        <div>
          {courseModules.map((m) => (
            <div key={m.id} className="course-module-item">
              <CourseModuleCard module={m} isRead={reading.isRead(m.id)} onOpen={() => nav(`/study/${m.id}`)} />
            </div>
          ))}
        </div>
      </CourseSection>

      <CourseSection title="Favoritos (para estudo)" description="Favoritar ajuda você a rever produtos depois e comparar com calma.">
        {dataState.status === "loading" || dataState.status === "idle" ? <div>Carregando base…</div> : null}
        {dataState.status === "error" ? (
          <div className="error">
            {offline
              ? "Sem conexão e ainda não há cache local. Conecte-se uma vez para abrir o app e baixar a base."
              : "Falha ao carregar base. Recarregue e confirme se os assets estão disponíveis."}
          </div>
        ) : null}

        {dataState.status === "ready" && favoriteProducts ? (
          favoriteProducts.length === 0 ? (
            <div className="notice">Ainda não há favoritos. Favorite produtos na Consulta ou na Ficha.</div>
          ) : (
            <ResultsList
              title="Seus favoritos"
              shown={favoriteProducts.length}
              total={favoriteProducts.length}
              hasMore={false}
              onLoadMore={() => {}}
            >
              <div className="cards">
                {favoriteProducts.map((product) => {
                  const p = product!;
                  const rid = getProductRouteId(p, dataState.data.products);
                  return (
                    <ProductCard
                      key={p.URL_produto}
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
            </ResultsList>
          )
        ) : null}
      </CourseSection>
    </div>
  );
}
