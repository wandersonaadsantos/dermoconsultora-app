import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { AppRoutes } from "../app/routes";

function jsonResponse(obj: unknown) {
  return new Response(JSON.stringify(obj), { status: 200, headers: { "Content-Type": "application/json" } });
}

function setupFetch() {
  const manifest = {
    version: "v2",
    created_at: new Date().toISOString(),
    total_products: 0,
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
    if (u.includes("data/v2/base_drogasil_dermoconsulta_enriquecida.json")) return jsonResponse([]);
    if (u.includes("data/v2/images_manifest.json")) return jsonResponse([]);
    return new Response("not found", { status: 404 });
  });

  vi.stubGlobal("fetch", mock);
}

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.unstubAllGlobals();
});

test("Modulo_estrutura_da_pele_mostra_diagrama_e_guia", async () => {
  setupFetch();
  window.location.hash = "#/study/estrutura-da-pele";
  render(<AppRoutes />);

  expect(await screen.findByRole("heading", { name: "Estrutura da pele" })).toBeInTheDocument();
  expect(screen.getByText(/Corte esquemático da pele/i)).toBeInTheDocument();
  expect(screen.getByText("Problemas e produtos que ajudam")).toBeInTheDocument();
  expect(screen.getByText("Oleosidade / brilho")).toBeInTheDocument();
});

test("Modulo_unhas_mostra_diagrama_e_alerta_no_guia", async () => {
  setupFetch();
  window.location.hash = "#/study/unhas-cuidados";
  render(<AppRoutes />);

  expect(await screen.findByRole("heading", { name: "Unhas: cuidado cosmético e sinais de alerta" })).toBeInTheDocument();
  expect(screen.getByText(/Vista esquemática da unha/i)).toBeInTheDocument();
  expect(screen.getByText(/Não é cosmético — chamar o farmacêutico/i)).toBeInTheDocument();
});
