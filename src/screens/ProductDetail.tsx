import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCompare } from "../app/state/CompareProvider";
import { useDataV1 } from "../app/state/DataProvider";
import { useFavorites } from "../app/state/FavoritesProvider";
import { Button } from "../components/Button";
import { ProductCard } from "../components/ProductCard";
import { ProductImage } from "../components/ProductImage";
import { SafetyBanner } from "../components/SafetyBanner";
import { findProductByRouteId, getProductRouteId } from "../data/productIdentity";
import { getSimilarProducts } from "../data/similarProducts";
import type { ProductRow } from "../data/types";
import {
  formatCautionLevel,
  formatCollectedDate,
  formatComparisonGroup,
  formatComplexityLevel,
  formatDataQualityNotes,
  formatDataQualityScore,
  formatDrogasilProductCode,
  formatFieldLabel,
  formatPrice,
  formatRoutineStep,
  formatSafeSummary,
  formatStatus,
  formatTagList,
  isMissing,
  productValue
} from "../presentation/formatters";

const LABEL_CONFIRM = "Informação não encontrada na base atual. Confirmar no rótulo antes de orientar.";
const SITE_INFO_EMPTY = "Este produto ainda não tem conteúdo do site na base. Abra no site e confirme no rótulo antes de orientar.";

function InfoItem(props: { label: string; value: string }) {
  return (
    <div className="info-item">
      <div className="info-item-label">{props.label}</div>
      <div className="info-item-value">{props.value}</div>
    </div>
  );
}

function TagList(props: { items: string[]; emptyText?: string }) {
  if (props.items.length === 0) {
    return <p className="muted">{props.emptyText ?? "Confirmar no rótulo."}</p>;
  }
  return (
    <div className="tag-list">
      {props.items.map((item) => (
        <span className="tag" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}

function missingLabel(product: ProductRow, label: string, keys: string[]) {
  return isMissing(productValue(product, keys)) ? label : null;
}

function copyText(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return Promise.reject(new Error("empty"));
  const clipboard = typeof navigator !== "undefined" ? navigator.clipboard : undefined;
  if (clipboard?.writeText) return clipboard.writeText(trimmed);
  const el = document.createElement("textarea");
  el.value = trimmed;
  el.setAttribute("readonly", "true");
  el.style.position = "fixed";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  return Promise.resolve();
}

function extractDrogasilCodeFromUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  const match = trimmed.match(/-(\d{5,})\.html(?:\?.*)?$/i);
  return match ? match[1] : "";
}

function openExternalUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return;
  try {
    const w = window.open(trimmed, "_blank", "noopener,noreferrer");
    if (!w) window.location.href = trimmed;
  } catch {
    window.location.href = trimmed;
  }
}

function FactualText(props: { value: string }) {
  return <p className="comfortable-text site-factual-text">{props.value}</p>;
}

export function ProductDetail() {
  const nav = useNavigate();
  const params = useParams();
  const dataState = useDataV1();
  const compare = useCompare();
  const favorites = useFavorites();
  const baseUrl = import.meta.env.BASE_URL ?? "/";
  const offline = typeof navigator !== "undefined" && navigator.onLine === false;
  const [copiedCode, setCopiedCode] = useState(false);

  const routeId = String(params.routeId ?? "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [routeId]);

  const product = useMemo(() => {
    if (dataState.status !== "ready") return null;
    return findProductByRouteId(dataState.data.products, routeId) ?? null;
  }, [dataState, routeId]);

  const view = useMemo(() => {
    if (!product) return null;
    const row = product as Record<string, unknown>;
    const needs = formatTagList(product.need_tags);
    const safePhrase =
      String(row["safe_recommendation_note"] ?? "").trim() ||
      String(row["Frase segura para atendimento"] ?? "").trim() ||
      formatSafeSummary(product);
    const missingItems = [
      missingLabel(product, "Modo de uso", ["Modo de uso", "site_how_to_use"]),
      missingLabel(product, "Advertências", ["Advertências", "site_warnings"]),
      missingLabel(product, "Restrições", ["Não indicar / cautela"]),
      missingLabel(product, "Indicação específica", ["Indicado para", "Finalidade"]),
      missingLabel(product, "Idade, gestante, lactante ou criança", ["Idade", "Gestante", "Lactante", "Criança"])
    ].filter(Boolean) as string[];

    const productUrl = String(productValue(product, ["URL_produto"]) ?? "");
    const extractedCode = extractDrogasilCodeFromUrl(productUrl);
    const drogasilCodeRawFromBase = productValue(product, ["drogasil_product_code"]);
    const drogasilCodeRaw = !isMissing(drogasilCodeRawFromBase)
      ? String(drogasilCodeRawFromBase ?? "").trim()
      : extractedCode;
    const drogasilCode = formatDrogasilProductCode(drogasilCodeRaw);
    const manufacturer = productValue(product, ["manufacturer"]);
    const seller = productValue(product, ["Vendido por", "seller"]);

    return {
      productName: String(product.Produto ?? "Produto sem nome"),
      brand: String(product.Marca ?? "Marca não informada"),
      price: formatPrice(productValue(product, ["Preço", "Preco", "price"])),
      size: String(productValue(product, ["quantity", "Tamanho/embalagem"]) ?? "Não encontrado na base"),
      collectedAt: formatCollectedDate(productValue(product, ["Data_coleta"])),
      productUrl,
      routineStep: formatRoutineStep(product.routine_step),
      needs,
      comparisonGroup: formatComparisonGroup(product.comparison_group),
      caution: formatCautionLevel(product.caution_level),
      complexity: formatComplexityLevel(product.complexity_level),
      safePhrase,
      safeSummary: formatSafeSummary(product),
      missingItems,
      drogasilCodeRaw,
      drogasilCode,
      decisionSummary: isMissing(row.decision_summary) ? "" : String(row.decision_summary ?? "").trim(),
      manufacturer: isMissing(manufacturer) ? "" : String(manufacturer ?? "").trim(),
      seller: isMissing(seller) ? "" : String(seller ?? "").trim(),
      siteDescription: isMissing(row.site_description) ? "" : String(row.site_description ?? "").trim(),
      siteBenefits: isMissing(row.site_benefits) ? "" : String(row.site_benefits ?? "").trim(),
      siteHowToUse: isMissing(row.site_how_to_use) ? "" : String(row.site_how_to_use ?? "").trim(),
      siteWarnings: isMissing(row.site_warnings) ? "" : String(row.site_warnings ?? "").trim(),
      siteCharacteristics: isMissing(row.site_characteristics) ? "" : String(row.site_characteristics ?? "").trim(),
      dataQualityScore: formatDataQualityScore(row.data_quality_score),
      dataQualityNotes: formatDataQualityNotes(row.data_quality_notes),
      status: formatStatus(row.Status_coleta),
      technicalFields: [
        "source_hash",
        "product_id",
        "data_quality_score",
        "data_quality_notes",
        "Status_coleta",
        "URL_produto",
        "categoria_derivada",
        "finalidade_derivada",
        "indicacao_derivada",
        "textura_derivada",
        "cautela_derivada",
        "routine_step",
        "need_tags",
        "comparison_group",
        "caution_level",
        "complexity_level"
      ]
        .map((key) => [key, row[key]] as const)
        .filter(([, value]) => !isMissing(value))
    };
  }, [product]);

  const similar = useMemo(() => {
    if (dataState.status !== "ready") return null;
    if (!product) return null;
    return getSimilarProducts(dataState.data.products, product, 8);
  }, [dataState, product]);

  const originText = useMemo(() => {
    if (!product) return "";
    const raw = productValue(product, ["Data_coleta"]);
    const date = formatCollectedDate(raw);
    return date === "Não encontrada na base"
      ? "Data de coleta não encontrada na base atual. Confirme disponibilidade e rótulo antes de orientar."
      : `Produto coletado do site Drogasil em ${date}. Isso não garante estoque na loja física. Confirme disponibilidade e rótulo antes de orientar.`;
  }, [product]);

  return (
    <div className="screen product-detail-screen">
      <h1>Ficha do produto</h1>
      <SafetyBanner note={originText} />

      {dataState.status === "loading" || dataState.status === "idle" ? <div>Carregando base...</div> : null}
      {dataState.status === "error" ? (
        <div className="error">
          {offline
            ? "Sem conexão e ainda não há cache local. Conecte-se uma vez para abrir o app e baixar a base."
            : "Falha ao carregar base. Recarregue e confirme se os assets estão disponíveis."}
        </div>
      ) : null}

      {dataState.status === "ready" && !product ? (
        <div className="error">
          Produto não encontrado para esta rota. Volte para a consulta e abra novamente a ficha.
        </div>
      ) : null}

      {dataState.status === "ready" && product && view ? (
        <>
          <div className="toolbar">
            <Button type="button" variant="secondary" onClick={() => nav("/consult")}>
              Voltar para consulta
            </Button>
            <Button type="button" variant="secondary" onClick={() => compare.toggle(product)}>
              {compare.has(product) ? "Remover da comparação" : "Comparar com outro"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => favorites.toggle(product)}>
              {favorites.has(product) ? "Remover favorito" : "Salvar para estudar"}
            </Button>
            <Button type="button" variant="primary" onClick={() => nav("/compare")}>
              Abrir comparação ({compare.selected.length})
            </Button>
          </div>

          <section className="product-hero">
            <div className="detail-img">
              <ProductImage product={product} kind="medium" data={dataState.data} baseUrl={baseUrl} />
            </div>
            <div className="product-hero-main">
              <div className="eyebrow">Resumo prático</div>
              <h2>{view.productName}</h2>
              <p className="brand-line">{view.brand}</p>
              <p className="safe-summary">{view.safeSummary}</p>
              <div className="summary-grid">
                <InfoItem label="Etapa da rotina" value={view.routineStep} />
                <InfoItem label="Cautela" value={view.caution} />
                <InfoItem label="Complexidade" value={view.complexity} />
              </div>
              <div>
                <div className="section-mini-title">Necessidades principais</div>
                <TagList items={view.needs} emptyText="Necessidades não identificadas na base." />
              </div>
            </div>
          </section>

          <div className="detail-readable-grid">
            <section className="detail-card">
              <h2>Informações do produto</h2>
              <div className="readable-list">
                <div className="info-item">
                  <div className="info-item-label">Código Drogasil</div>
                  <div className="code-row">
                    <div className="info-item-value">{view.drogasilCode}</div>
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={!view.drogasilCodeRaw}
                      onClick={async () => {
                        try {
                          await copyText(view.drogasilCodeRaw);
                          setCopiedCode(true);
                          setTimeout(() => setCopiedCode(false), 1200);
                        } catch {
                          setCopiedCode(false);
                        }
                      }}
                    >
                      {copiedCode ? "Copiado" : "Copiar código"}
                    </Button>
                    <span className="sr-only" role="status" aria-live="polite">
                      {copiedCode ? "Código copiado" : ""}
                    </span>
                  </div>
                </div>
                <InfoItem label="Produto" value={view.productName} />
                <InfoItem label="Marca" value={view.brand} />
                {view.manufacturer ? <InfoItem label="Fabricante" value={view.manufacturer} /> : null}
                <InfoItem label="Preço coletado" value={view.price} />
                <InfoItem label="Tamanho/quantidade" value={view.size} />
                {view.seller ? <InfoItem label="Vendido por" value={view.seller} /> : null}
                <InfoItem label="Data de coleta" value={view.collectedAt} />
                <InfoItem label="Origem" value="Site Drogasil" />
              </div>
              {view.productUrl ? (
                <a
                  className="link-button"
                  href={view.productUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openExternalUrl(view.productUrl);
                  }}
                >
                  Ver produto no site
                </a>
              ) : null}
            </section>

            {view.siteDescription || view.siteBenefits || view.siteHowToUse || view.siteWarnings || view.siteCharacteristics ? (
              <section className="detail-card">
                <h2>Informações do site Drogasil</h2>
                <div className="readable-list">
                  {view.siteDescription ? (
                    <div>
                      <div className="section-mini-title">Descrição</div>
                      <FactualText value={view.siteDescription} />
                    </div>
                  ) : null}
                  {view.siteBenefits ? (
                    <div>
                      <div className="section-mini-title">Benefícios</div>
                      <FactualText value={view.siteBenefits} />
                    </div>
                  ) : null}
                  {view.siteHowToUse ? (
                    <div>
                      <div className="section-mini-title">Como usar</div>
                      <FactualText value={view.siteHowToUse} />
                    </div>
                  ) : null}
                  {view.siteWarnings ? (
                    <div>
                      <div className="section-mini-title">Advertências</div>
                      <FactualText value={view.siteWarnings} />
                    </div>
                  ) : null}
                  {view.siteCharacteristics ? (
                    <div>
                      <div className="section-mini-title">Características</div>
                      <FactualText value={view.siteCharacteristics} />
                    </div>
                  ) : null}
                </div>
              </section>
            ) : null}

            <section className="detail-card">
              <h2>Interpretação do app</h2>
              <div className="readable-list">
                <InfoItem label="Etapa da rotina" value={view.routineStep} />
                <InfoItem label="Grupo de comparação" value={view.comparisonGroup} />
                <InfoItem label="Cautela" value={view.caution} />
                <InfoItem label="Complexidade" value={view.complexity} />
                <InfoItem label="Status da coleta" value={view.status} />
              </div>
              <div className="section-mini-title">Necessidades relacionadas</div>
              <TagList items={view.needs} />
            </section>
          </div>

          <section className="detail-card">
            <h2>O que posso falar com segurança</h2>
            {view.decisionSummary ? <p className="comfortable-text">{view.decisionSummary}</p> : null}
            <p className="comfortable-text">{view.safePhrase}</p>
          </section>

          <section className="detail-card warning-card">
            <h2>Confirmar no rótulo antes de orientar</h2>
            {view.missingItems.length >= 4 ? (
              <p className="comfortable-text">
                Modo de uso, advertências, restrições, indicação e restrições por faixa etária não foram encontrados na base.
                Confirmar tudo no rótulo antes de orientar.
              </p>
            ) : view.missingItems.length > 0 ? (
              <div className="confirm-list">
                {view.missingItems.map((item) => (
                  <div className="confirm-item" key={item}>
                    <strong>{item}</strong>
                    <span>{LABEL_CONFIRM}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="comfortable-text">
                As informações principais foram encontradas, mas o rótulo ainda deve ser conferido antes de orientar.
              </p>
            )}
          </section>

          <section className="detail-card pharmacist-card">
            <h2>Quando chamar farmacêutico</h2>
            <p>
              Chame o farmacêutico se houver ardência forte, ferida, alergia, uso de medicamento dermatológico,
              gravidez/lactação com dúvida, criança pequena ou pedido de diagnóstico.
            </p>
          </section>

          <section className="detail-card">
            <h2>Posso comparar com outro?</h2>
            <p className="comfortable-text">
              Sim. Compare produtos do mesmo grupo e confirme no rótulo quando houver dúvida de uso, restrição ou
              indicação.
            </p>
            <div className="toolbar toolbar-inner">
              <Button type="button" variant="secondary" onClick={() => compare.toggle(product)}>
                {compare.has(product) ? "Remover da comparação" : "Adicionar para comparar"}
              </Button>
              <Button type="button" variant="primary" onClick={() => nav("/compare")}>
                Abrir comparação
              </Button>
            </div>
          </section>

          <section className="detail-card">
            <h2>Produtos similares ou relacionados</h2>
            {similar?.warningOutros ? (
              <div className="notice">
                Esses produtos são relacionados, mas não necessariamente substitutos diretos.
              </div>
            ) : null}
            {similar && dataState.status === "ready" ? (
              similar.items.length === 0 ? (
                <p className="comfortable-text">
                  Nenhum produto relacionado encontrado na base atual. Use a busca e compare se precisar de alternativa.
                </p>
              ) : (
                <div className="cards">
                  {similar.items.map((item) => {
                    const rid = getProductRouteId(item.product, dataState.data.products);
                    return (
                      <div key={String(item.product.URL_produto ?? "")}>
                        <div className="related-reason">Motivo: {item.reason}</div>
                        <ProductCard
                          product={item.product}
                          data={dataState.data}
                          baseUrl={baseUrl}
                          isInCompare={compare.has(item.product)}
                          onToggleCompare={() => compare.toggle(item.product)}
                          isFavorite={favorites.has(item.product)}
                          onToggleFavorite={() => favorites.toggle(item.product)}
                          onOpen={() => nav(`/product/${rid}`)}
                        />
                      </div>
                    );
                  })}
                </div>
              )
            ) : null}
          </section>

          <details className="technical-details">
            <summary>Ver detalhes técnicos da base</summary>
            <div className="technical-grid">
              <InfoItem label="Qualidade dos dados" value={view.dataQualityScore} />
              {view.dataQualityNotes.length > 0 ? (
                <div className="technical-notes">
                  <div className="info-item-label">Observações de qualidade</div>
                  <ul>
                    {view.dataQualityNotes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {view.technicalFields.map(([key, value]) => (
                <InfoItem key={key} label={formatFieldLabel(key)} value={String(value)} />
              ))}
            </div>
          </details>
        </>
      ) : null}
    </div>
  );
}
