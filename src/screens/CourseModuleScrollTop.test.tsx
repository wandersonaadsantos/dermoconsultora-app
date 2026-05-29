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
  return mock;
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

test("CourseModule_ao_abrir_modulo_chama_scroll_para_o_topo", async () => {
  setupFetch();
  const scrollSpy = vi.fn();
  Object.defineProperty(window, "scrollTo", { value: scrollSpy, writable: true });

  window.location.hash = "#/study/treino-de-fala-objecoes";
  render(<AppRoutes />);

  expect(await screen.findByRole("heading", { level: 1, name: "Treino de fala (objeções comuns)" })).toBeInTheDocument();
  expect(scrollSpy).toHaveBeenCalledWith(0, 0);
});

