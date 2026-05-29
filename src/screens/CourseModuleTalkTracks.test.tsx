import { render, screen } from "@testing-library/react";
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
  vi.unstubAllGlobals();
});

test("CourseModule_exibe_treino_de_fala_quando_houver_talk_tracks", async () => {
  setupFetch();
  Object.defineProperty(window, "scrollTo", { value: vi.fn(), writable: true });
  window.location.hash = "#/study/treino-de-fala-objecoes";
  render(<AppRoutes />);

  expect(await screen.findByText("Treino de fala (objeções comuns)")).toBeInTheDocument();
  expect(await screen.findByRole("heading", { level: 2, name: "Treino de fala" })).toBeInTheDocument();
  expect(screen.getAllByText("Cliente:").length).toBeGreaterThan(0);
});
