import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
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
  return mock;
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  localStorage.clear();
});

test("Course_exibe_trilha_por_etapas", async () => {
  setupFetch();
  window.location.hash = "#/study";
  render(<AppRoutes />);

  const heading = await screen.findByRole("heading", { level: 2, name: "Fundamentos" });
  const section = heading.closest("section");
  expect(section).not.toBeNull();

  // a etapa "Fundamentos" começa pelo papel da dermoconsultora
  expect(within(section as HTMLElement).getByText("Papel da dermoconsultora")).toBeInTheDocument();
  // outras etapas da jornada também aparecem
  expect(screen.getByRole("heading", { level: 2, name: "Produtos na prática" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 2, name: "Atendimento e venda" })).toBeInTheDocument();
});

test("Course_continuar_abre_o_primeiro_modulo_nao_lido", async () => {
  setupFetch();
  window.location.hash = "#/study";
  render(<AppRoutes />);

  fireEvent.click(await screen.findByRole("button", { name: "Continuar de onde parei" }));
  expect(await screen.findByRole("heading", { level: 1, name: "Papel da dermoconsultora" })).toBeInTheDocument();
});
