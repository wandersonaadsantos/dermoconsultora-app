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

test("Revisao_vazia_quando_nada_concluido", async () => {
  setupFetch();
  window.location.hash = "#/study/revisao";
  render(<AppRoutes />);

  expect(await screen.findByRole("heading", { level: 1, name: "Revisão" })).toBeInTheDocument();
  expect(screen.getByText(/Conclua um módulo com quiz para liberar/)).toBeInTheDocument();
});

test("Revisao_mostra_perguntas_dos_modulos_concluidos", async () => {
  localStorage.setItem("dermoconsultora:study:read-modules", JSON.stringify(["estrutura-da-pele"]));
  setupFetch();
  window.location.hash = "#/study/revisao";
  render(<AppRoutes />);

  expect(await screen.findByRole("heading", { level: 1, name: "Revisão" })).toBeInTheDocument();
  expect(screen.getByText(/Recordação rápida do que você já estudou/)).toBeInTheDocument();
  expect(screen.getByText(/Pergunta 1 de/)).toBeInTheDocument();
});

test("Trilha_mostra_atalho_de_revisao_quando_ha_modulo_concluido", async () => {
  localStorage.setItem("dermoconsultora:study:read-modules", JSON.stringify(["estrutura-da-pele"]));
  setupFetch();
  window.location.hash = "#/study";
  render(<AppRoutes />);

  expect(await screen.findByRole("button", { name: "Revisar o que aprendi" })).toBeInTheDocument();
});
