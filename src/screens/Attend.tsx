import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCompare } from "../app/state/CompareProvider";
import { useDataV1 } from "../app/state/DataProvider";
import { useFavorites } from "../app/state/FavoritesProvider";
import { Button } from "../components/Button";
import { Chip } from "../components/Chip";
import { ProductCard } from "../components/ProductCard";
import { SafetyBanner } from "../components/SafetyBanner";
import { uniqueNeedTags } from "../data/facets";
import { normalizeForSearch } from "../data/normalize";
import { getProductRouteId } from "../data/productIdentity";
import type { ProductRow } from "../data/types";
import { buildAttendResult } from "../attend/attendFlow";
import type { AttendArea, AttendPreference } from "../attend/attendTypes";
import { buildMoreNeeds, CURATED_NEEDS } from "../attend/needOptions";

type AttendStep = "need" | "area" | "preference" | "alert" | "results";

const MAX_NEEDS = 3;

const STEP_NAMES: Record<AttendStep, string> = {
  need: "Necessidades",
  area: "Área",
  preference: "Preferência",
  alert: "Sinal de alerta",
  results: "Resultado"
};

function needSlug(label: string) {
  return normalizeForSearch(label)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function urlStepToInternal(urlStep: string): AttendStep {
  if (urlStep === "needs") return "need";
  if (urlStep === "area") return "area";
  if (urlStep === "preference") return "preference";
  if (urlStep === "alert") return "alert";
  if (urlStep === "results") return "results";
  return "need";
}

function internalStepToUrl(s: AttendStep) {
  if (s === "need") return "needs";
  return s;
}

function areaParamToArea(value: string): AttendArea {
  const v = normalizeForSearch(value);
  if (v === "rosto") return "Rosto";
  if (v === "corpo") return "Corpo";
  if (v === "cabelo") return "Cabelo";
  if (v === "perfumaria") return "Perfumaria";
  if (v === "maquiagem") return "Maquiagem";
  return "Rosto";
}

function areaToParam(value: AttendArea) {
  if (value === "Rosto") return "rosto";
  if (value === "Corpo") return "corpo";
  if (value === "Cabelo") return "cabelo";
  if (value === "Perfumaria") return "perfumaria";
  return "maquiagem";
}

function getInitialSearch(): string {
  if (typeof window === "undefined") return "";
  const hash = window.location.hash;
  const idx = hash.indexOf("?");
  return idx >= 0 ? hash.slice(idx) : "";
}

function parseStateFromSearch(search: string) {
  const params = new URLSearchParams(search);
  const rawStep = params.get("step") ?? "needs";
  const normalizedStep =
    rawStep === "needs" || rawStep === "area" || rawStep === "preference" || rawStep === "alert" || rawStep === "results"
      ? rawStep
      : "needs";

  const needsRaw = (params.get("needs") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, MAX_NEEDS);

  const restoredNeeds: Array<{ kind: "tag" | "query"; value: string; label: string }> = [];
  for (const id of needsRaw) {
    const match = CURATED_NEEDS.find((label) => needSlug(label) === id);
    if (match) restoredNeeds.push({ kind: "query", value: match, label: match });
  }

  const effectiveStep = restoredNeeds.length === 0 && normalizedStep !== "needs" ? "needs" : normalizedStep;

  return {
    step: urlStepToInternal(effectiveStep),
    needs: restoredNeeds,
    area: areaParamToArea(params.get("area") ?? ""),
    preference: (params.get("preference") ?? "sem-preferencia") as AttendPreference,
    hasAlert: params.get("alert") === "yes"
  };
}

export function Attend() {
  const nav = useNavigate();
  const location = useLocation();
  const dataState = useDataV1();
  const compare = useCompare();
  const favorites = useFavorites();
  const baseUrl = import.meta.env.BASE_URL ?? "/";

  const [step, setStep] = useState<AttendStep>(() => parseStateFromSearch(getInitialSearch()).step);
  const [needs, setNeeds] = useState(() => parseStateFromSearch(getInitialSearch()).needs);
  const [area, setArea] = useState<AttendArea>(() => parseStateFromSearch(getInitialSearch()).area);
  const [preference, setPreference] = useState<AttendPreference>(() => parseStateFromSearch(getInitialSearch()).preference);
  const [hasAlert, setHasAlert] = useState(() => parseStateFromSearch(getInitialSearch()).hasAlert);
  const [showMoreNeeds, setShowMoreNeeds] = useState(false);
  const [moreNeedQuery, setMoreNeedQuery] = useState("");
  const [moreNeedSelectedValue, setMoreNeedSelectedValue] = useState("");
  const [needsWarning, setNeedsWarning] = useState("");
  const nextUrlSyncModeRef = useRef<"push" | "replace">("replace");

  const knownNeedTags = useMemo(() => {
    if (dataState.status !== "ready") return [];
    return uniqueNeedTags(dataState.data.products);
  }, [dataState]);

  const moreNeeds = useMemo(() => buildMoreNeeds(knownNeedTags), [knownNeedTags]);

  const toggleNeed = (next: { kind: "tag" | "query"; value: string; label: string }) => {
    setNeedsWarning("");
    setNeeds((prev) => {
      const exists = prev.some((n) => n.kind === next.kind && n.value === next.value);
      if (exists) return prev.filter((n) => !(n.kind === next.kind && n.value === next.value));
      if (prev.length >= MAX_NEEDS) {
        setNeedsWarning("Escolha até 3 para manter a orientação simples.");
        return prev;
      }
      return [...prev, next];
    });
  };

  const productKey = (p: ProductRow) => {
    const rid = getProductRouteId(p, dataState.status === "ready" ? dataState.data.products : []);
    return String(p.URL_produto ?? rid);
  };

  const recommendation = useMemo(() => {
    if (dataState.status !== "ready") return null;
    if (needs.length === 0) return null;

    if (hasAlert) {
      return buildAttendResult(dataState.data.products, {
        need: needs[0].value,
        needKind: needs[0].kind,
        area,
        preference,
        hasAlert: true
      });
    }

    const combined = new Map<string, { product: ProductRow; matchedLabels: string[] }>();
    for (const selected of needs) {
      const result = buildAttendResult(dataState.data.products, {
        need: selected.value,
        needKind: selected.kind,
        area,
        preference,
        hasAlert: false
      });

      if (result.mode !== "recommendations") continue;
      for (const p of result.items as ProductRow[]) {
        const key = productKey(p);
        const existing = combined.get(key);
        if (existing) {
          if (!existing.matchedLabels.includes(selected.label)) existing.matchedLabels.push(selected.label);
        } else {
          combined.set(key, { product: p, matchedLabels: [selected.label] });
        }
      }
    }

    const items = Array.from(combined.values())
      .sort((a, b) => {
        if (b.matchedLabels.length !== a.matchedLabels.length) return b.matchedLabels.length - a.matchedLabels.length;
        return String(a.product.Produto ?? "").localeCompare(String(b.product.Produto ?? ""));
      })
      .slice(0, 8);

    const safePhrase = buildAttendResult(dataState.data.products, {
      need: needs[0].value,
      needKind: needs[0].kind,
      area,
      preference,
      hasAlert: false
    }).safePhrase;

    return {
      mode: "recommendations" as const,
      safePhrase,
      reason: "Recomendações por múltiplas necessidades",
      items
    };
  }, [area, dataState, hasAlert, needs, preference]);

  const canNext = useMemo(() => {
    if (step === "need") return needs.length > 0;
    return true;
  }, [needs.length, step]);

  const goNext = () => {
    nextUrlSyncModeRef.current = "push";
    if (step === "need") return setStep("area");
    if (step === "area") return setStep("preference");
    if (step === "preference") return setStep("alert");
    if (step === "alert") return setStep("results");
  };

  const goPrev = () => {
    nextUrlSyncModeRef.current = "push";
    if (step === "results") return setStep("alert");
    if (step === "alert") return setStep("preference");
    if (step === "preference") return setStep("area");
    if (step === "area") return setStep("need");
  };

  const reset = () => {
    nextUrlSyncModeRef.current = "push";
    setStep("need");
    setNeeds([]);
    setArea("Rosto");
    setPreference("sem-preferencia");
    setHasAlert(false);
    setShowMoreNeeds(false);
    setMoreNeedQuery("");
    setMoreNeedSelectedValue("");
    setNeedsWarning("");
  };

  const stepNumber = useMemo(() => {
    if (step === "need") return 1;
    if (step === "area") return 2;
    if (step === "preference") return 3;
    if (step === "alert") return 4;
    return 5;
  }, [step]);

  const preferenceLabel = useMemo(() => {
    if (preference === "sem-preferencia") return "Sem preferência";
    if (preference === "uso-simples") return "Uso simples";
    return "Mais suave";
  }, [preference]);

  const showPreferenceInSummary = step === "preference" || step === "alert" || step === "results";
  const showAlertInSummary = step === "alert" || step === "results";

  // Restore state when URL changes (browser back/forward)
  useEffect(() => {
    const parsed = parseStateFromSearch(location.search);

    setNeeds((prev) => {
      const same =
        prev.length === parsed.needs.length &&
        prev.every((p, idx) => p.kind === parsed.needs[idx]?.kind && p.value === parsed.needs[idx]?.value);
      return same ? prev : parsed.needs;
    });
    setArea(parsed.area);
    setPreference(parsed.preference);
    setHasAlert(parsed.hasAlert);
    setStep(parsed.step);
  }, [location.search]);

  // Sync state → URL
  useEffect(() => {
    const urlStep = internalStepToUrl(step);
    const params = new URLSearchParams();
    params.set("step", urlStep);

    if (needs.length > 0) {
      params.set(
        "needs",
        needs
          .slice(0, MAX_NEEDS)
          .map((n) => needSlug(n.label))
          .join(",")
      );
    }

    if (urlStep === "preference" || urlStep === "alert" || urlStep === "results") {
      params.set("area", areaToParam(area));
    }

    if (urlStep === "alert" || urlStep === "results") {
      params.set("preference", preference);
    }

    if (urlStep === "results") {
      params.set("alert", hasAlert ? "yes" : "no");
    }

    const desiredSearch = `?${params.toString()}`;
    if (location.search === desiredSearch) return;

    const replace = nextUrlSyncModeRef.current !== "push";
    nextUrlSyncModeRef.current = "replace";
    nav({ pathname: location.pathname, search: desiredSearch }, { replace });
  }, [area, hasAlert, location.pathname, location.search, nav, needs, preference, step]);

  return (
    <div className="screen attend-screen">
      <h1>Atender cliente com apoio</h1>
      <SafetyBanner />
      <p className="attend-step" aria-live="polite">
        Etapa {stepNumber} de 5 — {STEP_NAMES[step]}
      </p>

      <div className="toolbar">
        {step !== "need" ? (
          <Button type="button" variant="secondary" onClick={goPrev}>
            Voltar
          </Button>
        ) : null}
        {step !== "results" ? (
          <Button type="button" variant="primary" onClick={goNext} disabled={!canNext}>
            Próxima etapa
          </Button>
        ) : (
          <Button type="button" variant="secondary" onClick={reset}>
            Reiniciar
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={() => nav("/safety")}>
          Checklist de segurança
        </Button>
      </div>

      {step !== "need" ? (
        <div className="attend-summary">
          <h2>Resumo do atendimento</h2>
          <div className="attend-summary-grid">
            <div className="info-item">
              <div className="info-item-label">Necessidades</div>
              {needs.length === 0 ? (
                <div className="muted">—</div>
              ) : (
                <div className="tag-list">
                  {needs.map((n) => (
                    <span key={`${n.kind}:${n.value}`} className="tag">
                      {n.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="info-item">
              <div className="info-item-label">Área</div>
              <div className="info-item-value">{area}</div>
            </div>
            <div className="info-item">
              <div className="info-item-label">Preferência</div>
              <div className="info-item-value">{showPreferenceInSummary ? preferenceLabel : "—"}</div>
            </div>
            <div className="info-item">
              <div className="info-item-label">Alerta</div>
              <div className="info-item-value">
                {showAlertInSummary ? (hasAlert ? "Sim, chamar farmacêutico" : "Não identifiquei alerta") : "—"}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {step === "need" ? (
        <>
          <h2>1) Quais necessidades a cliente trouxe?</h2>
          <div className="notice" aria-live="polite">
            Marque até {MAX_NEEDS} necessidades — {needs.length} de {MAX_NEEDS} selecionadas.
          </div>
          {needsWarning ? <div className="notice">{needsWarning}</div> : null}
          <div className="chips">
            {CURATED_NEEDS.map((label) => (
              <Chip
                key={label}
                selected={needs.some((n) => n.kind === "query" && n.value === label)}
                onClick={() => toggleNeed({ kind: "query", value: label, label })}
              >
                {label}
              </Chip>
            ))}
          </div>

          <div className="toolbar">
            <Button type="button" variant="secondary" onClick={() => setShowMoreNeeds((v) => !v)}>
              {showMoreNeeds ? "Ocultar necessidades" : "Ver mais necessidades"}
            </Button>
          </div>

          {showMoreNeeds ? (
            <div className="filters">
              <div className="field">
                <div className="field-label">Buscar na lista completa</div>
                <input
                  className="input"
                  value={moreNeedQuery}
                  onChange={(e) => setMoreNeedQuery(e.target.value)}
                  placeholder="Ex.: queda, manchas, poros"
                />
                <div className="hint">Digite para filtrar e encontrar mais rápido.</div>
              </div>
              <div className="field">
                <div className="field-label">Necessidades da base</div>
                <select
                  className="input"
                  value={moreNeedSelectedValue}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (!v) return setMoreNeedSelectedValue("");
                    const opt = moreNeeds.find((n) => n.value === v);
                    if (opt) toggleNeed({ kind: "tag", value: opt.value, label: opt.label });
                    setMoreNeedSelectedValue("");
                  }}
                >
                  <option value="">Selecionar…</option>
                  {(moreNeedQuery.trim().length > 0
                    ? moreNeeds.filter((n) => n.label.toLowerCase().includes(moreNeedQuery.trim().toLowerCase()))
                    : moreNeeds.slice(0, 200)
                  ).map((n) => (
                    <option key={n.value} value={n.value}>
                      {n.label}
                    </option>
                  ))}
                </select>
                <div className="hint">Se não aparecer, refine a busca. A lista é grande.</div>
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      {step === "area" ? (
        <>
          <h2>2) Qual é a área?</h2>
          <div className="chips" role="radiogroup" aria-label="Área do atendimento">
            {(["Rosto", "Corpo", "Cabelo", "Perfumaria", "Maquiagem"] as const).map((a) => (
              <Chip key={a} role="radio" selected={area === a} onClick={() => setArea(a)}>
                {a}
              </Chip>
            ))}
          </div>
        </>
      ) : null}

      {step === "preference" ? (
        <>
          <h2>3) Preferência rápida</h2>
          <div className="notice">Use isso para reduzir risco e simplificar a escolha.</div>
          <div className="chips" role="radiogroup" aria-label="Preferência da cliente">
            {([
              ["sem-preferencia", "Sem preferência"],
              ["uso-simples", "Uso simples"],
              ["mais-suave", "Mais suave"]
            ] as const).map(([value, label]) => (
              <Chip key={value} role="radio" selected={preference === value} onClick={() => setPreference(value)}>
                {label}
              </Chip>
            ))}
          </div>
        </>
      ) : null}

      {step === "alert" ? (
        <>
          <h2>4) Existe sinal de alerta?</h2>
          <div className="notice">
            Ferida, alergia forte, ardência intensa, inchaço, secreção, dor importante ou piora rápida.
          </div>
          <div className="chips" role="radiogroup" aria-label="Existe sinal de alerta?">
            <Chip role="radio" selected={!hasAlert} onClick={() => setHasAlert(false)}>
              Não
            </Chip>
            <Chip role="radio" selected={hasAlert} onClick={() => setHasAlert(true)}>
              Sim
            </Chip>
          </div>
          {hasAlert ? (
            <div className="error">Chame o farmacêutico antes de indicar qualquer produto.</div>
          ) : null}
        </>
      ) : null}

      {step === "results" ? (
        <>
          <h2>5) Próximos passos</h2>

          {dataState.status === "loading" || dataState.status === "idle" ? <div>Carregando base…</div> : null}
          {dataState.status === "error" ? (
            <div className="error">Falha ao carregar base. Use a consulta quando a base estiver disponível.</div>
          ) : null}

          {recommendation?.mode === "alert" ? (
            <>
              <div className="error">Sinal de alerta marcado. Não recomende produto. Chame o farmacêutico.</div>
              <div className="notice">{recommendation.safePhrase}</div>
              <div className="toolbar">
                <Button type="button" variant="primary" onClick={() => nav("/safety")}>
                  Abrir checklist
                </Button>
                <Button type="button" variant="secondary" onClick={() => nav("/consult")}>
                  Abrir consulta (sem indicar)
                </Button>
              </div>
            </>
          ) : recommendation?.mode === "recommendations" && dataState.status === "ready" ? (
            <>
              <div className="notice">{recommendation.safePhrase}</div>
              <div className="notice">
                Sugestões para começar. Confirmar no rótulo antes de orientar. Se não fizer sentido, abra a consulta completa.
              </div>
              <div className="toolbar">
                <Button type="button" variant="secondary" onClick={() => nav("/consult")}>
                  Abrir consulta completa
                </Button>
              </div>
              {recommendation.items.length === 0 ? (
                <div className="notice">Não encontrei opções com esse recorte na base atual.</div>
              ) : (
                <div className="cards">
                  {(recommendation.items as Array<{ product: ProductRow; matchedLabels: string[] }>)
                    .slice(0, 8)
                    .map((rec) => {
                      const rid = getProductRouteId(rec.product, dataState.data.products);
                      const reason = rec.matchedLabels.length > 0 ? `Combina com: ${rec.matchedLabels.join("; ")}` : "";
                      return (
                        <div key={String(rec.product.URL_produto ?? rid)}>
                          {reason ? <div className="related-reason">{reason}</div> : null}
                          <ProductCard
                            product={rec.product}
                            data={dataState.data}
                            baseUrl={baseUrl}
                            isInCompare={compare.has(rec.product)}
                            onToggleCompare={() => compare.toggle(rec.product)}
                            isFavorite={favorites.has(rec.product)}
                            onToggleFavorite={() => favorites.toggle(rec.product)}
                            onOpen={() => nav(`/product/${rid}`)}
                          />
                        </div>
                      );
                    })}
                </div>
              )}
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
