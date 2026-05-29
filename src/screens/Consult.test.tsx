import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { AppRoutes } from "../app/routes";

function jsonResponse(obj: unknown) {
  return new Response(JSON.stringify(obj), { status: 200, headers: { "Content-Type": "application/json" } });
}

function setupFetch(input?: { products?: any[] }) {
  const products = input?.products ?? [];
  const manifest = {
    version: "v2",
    created_at: new Date().toISOString(),
    total_products: products.length,
    need_tags_coverage: 0,
    comparison_group_coverage: 0,
    tratamento_cosmetico_outros_count: 0,
    warnings_count: 0,
    both_substitute_and_complementary_count: 0,
    can_start_app: true,
    limitations: []
  };

  const mock = vi.fn(async (url: RequestInfo | URL) => {
    const u = String(url);
    if (u.includes("data/v2/data_freeze_manifest.json")) return jsonResponse(manifest);
    if (u.includes("data/v2/base_drogasil_dermoconsulta_enriquecida.json")) return jsonResponse(products);
    if (u.includes("data/v2/images_manifest.json")) return jsonResponse([]);
    return new Response("not found", { status: 404 });
  });

  vi.stubGlobal("fetch", mock);
  return mock;
}

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.unstubAllGlobals();
});

test("Consult_busca_fica_sempre_visivel_e_filtros_avancados_ficam_em_bloco_separado", async () => {
  setupFetch();
  window.location.hash = "#/consult";
  render(<AppRoutes />);

  expect(await screen.findByRole("textbox", { name: /buscar/i })).toBeInTheDocument();
  expect(screen.getByText("Filtros avançados")).toBeInTheDocument();
  expect(screen.getByText("Marca")).toBeInTheDocument();
});

test("Consult_filtro_de_preco_filtra_por_faixa", async () => {
  setupFetch({
    products: [
      { URL_produto: "https://www.drogasil.com.br/a-1.html", Produto: "ProdPremium", Marca: "M", price_tier: "premium" },
      { URL_produto: "https://www.drogasil.com.br/b-2.html", Produto: "ProdMedio", Marca: "M", price_tier: "médio" }
    ]
  });
  window.location.hash = "#/consult";
  render(<AppRoutes />);

  expect(await screen.findByText("ProdPremium")).toBeInTheDocument();
  expect(screen.getByText("ProdMedio")).toBeInTheDocument();

  const select = screen.getByRole("combobox", { name: /preço/i });
  fireEvent.change(select, { target: { value: "premium" } });

  await waitFor(() => expect(screen.queryByText("ProdMedio")).toBeNull());
  expect(screen.getByText("ProdPremium")).toBeInTheDocument();
});

test("Consult_restaura_busca_e_needsOnly_pela_URL_e_limpar_filtros_remove_query_params", async () => {
  setupFetch();
  window.location.hash = "#/consult?q=gel&needsOnly=true";
  render(<AppRoutes />);

  const input = await screen.findByRole("textbox", { name: /buscar/i });
  expect(input).toHaveValue("gel");

  const chip = screen.getByRole("button", { name: "Só produtos com necessidade identificada" });
  expect(chip.className).toContain("chip-selected");

  fireEvent.click(screen.getByRole("button", { name: "Limpar filtros" }));
  await waitFor(() => expect(window.location.hash).toBe("#/consult"));
});
