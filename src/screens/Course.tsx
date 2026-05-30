import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCompare } from "../app/state/CompareProvider";
import { useDataV1 } from "../app/state/DataProvider";
import { useFavorites } from "../app/state/FavoritesProvider";
import { Button } from "../components/Button";
import { CourseModuleCard } from "../components/course/CourseModuleCard";
import { CourseSection } from "../components/course/CourseSection";
import { StudyProgressHero } from "../components/course/StudyProgressHero";
import { ProductCard } from "../components/ProductCard";
import { ResultsList } from "../components/ResultsList";
import { SafetyBanner } from "../components/SafetyBanner";
import { courseModules } from "../course/courseModules";
import { getProductRouteId } from "../data/productIdentity";
import { STAGES, collectReviewQuestions, computeMilestones, computeStageProgress, nextModuleId } from "../study/gamification";
import { useReadingProgress } from "../study/useReadingProgress";

export function Course() {
  const nav = useNavigate();
  const dataState = useDataV1();
  const compare = useCompare();
  const favorites = useFavorites();
  const reading = useReadingProgress();
  const baseUrl = import.meta.env.BASE_URL ?? "/";
  const offline = typeof navigator !== "undefined" && navigator.onLine === false;

  const totalModules = courseModules.length;
  const byId = useMemo(() => new Map(courseModules.map((m) => [m.id, m] as const)), []);

  const readCount = useMemo(
    () => courseModules.filter((m) => reading.readSet.has(m.id)).length,
    [reading.readSet]
  );

  const nextId = useMemo(() => nextModuleId(reading.readSet), [reading.readSet]);
  const milestones = useMemo(() => computeMilestones(reading.readSet), [reading.readSet]);
  const reviewCount = useMemo(() => collectReviewQuestions(reading.readSet).length, [reading.readSet]);

  const favoriteProducts = useMemo(() => {
    if (dataState.status !== "ready") return null;
    const byUrl = new Map(dataState.data.products.map((p) => [String(p.URL_produto ?? "").trim(), p] as const));
    return favorites.favorites.map((url) => byUrl.get(url)).filter(Boolean);
  }, [dataState, favorites.favorites]);

  return (
    <div className="screen study-screen screen-stack">
      <h1>Formação</h1>

      <SafetyBanner text="Use este app como apoio no atendimento. Confira o rótulo e chame o farmacêutico em caso de dúvida ou sinal de alerta." />

      <StudyProgressHero
        readCount={readCount}
        total={totalModules}
        streak={reading.streak}
        hasNext={nextId != null}
        onContinue={() => {
          if (nextId) nav(`/study/${nextId}`);
        }}
      />

      {milestones.length > 0 ? (
        <div className="trilha-milestones" aria-label="Conquistas">
          {milestones.map((s) => (
            <span key={s.id} className="trilha-milestone">
              {s.icon} {s.title} ✓
            </span>
          ))}
        </div>
      ) : null}

      <div className="toolbar">
        {reviewCount > 0 ? (
          <Button type="button" variant="primary" onClick={() => nav("/study/revisao")}>
            Revisar o que aprendi
          </Button>
        ) : null}
        <Button type="button" variant="secondary" onClick={() => nav("/consult")}>
          Consultar produtos
        </Button>
        <Button type="button" variant="secondary" onClick={() => nav("/safety")}>
          Checklist rápido
        </Button>
      </div>

      {STAGES.map((stage) => {
        const sp = computeStageProgress(stage, reading.readSet);
        return (
          <section key={stage.id} className="trilha-stage">
            <div className="trilha-stage-head">
              <span className="trilha-stage-icon" aria-hidden="true">
                {stage.icon}
              </span>
              <div className="trilha-stage-titles">
                <h2>{stage.title}</h2>
                <div className="trilha-stage-progress">
                  {sp.read}/{sp.total}
                  {sp.complete ? " · concluída ✓" : ""}
                </div>
              </div>
            </div>
            <div className="trilha-stage-bar">
              <span className="trilha-stage-bar-fill" style={{ width: `${sp.percent}%` }} />
            </div>
            <ol className="trilha-steps">
              {stage.moduleIds.map((id) => {
                const m = byId.get(id);
                if (!m) return null;
                const read = reading.isRead(id);
                const isCurrent = id === nextId;
                const nodeClass = ["trilha-node", read ? "is-done" : isCurrent ? "is-current" : ""]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <li key={id} className="trilha-step">
                    <span className={nodeClass} aria-hidden="true">
                      {read ? "✓" : isCurrent ? "●" : ""}
                    </span>
                    <div className="trilha-step-card">
                      <CourseModuleCard module={m} isRead={read} onOpen={() => nav(`/study/${id}`)} />
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}

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
