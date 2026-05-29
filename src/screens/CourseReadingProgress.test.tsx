import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { AppRoutes } from "../app/routes";
import { courseModules } from "../course/courseModules";
import { READING_PROGRESS_STORAGE_KEY } from "../study/useReadingProgress";

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
  localStorage.clear();
  vi.unstubAllGlobals();
});

test("Course_mostra_progresso_x_de_y_modulos_lidos", async () => {
  setupFetch();
  window.location.hash = "#/study";
  render(<AppRoutes />);

  expect(await screen.findByRole("heading", { level: 1, name: "Formação" })).toBeInTheDocument();
  expect(screen.getByText(`0 de ${courseModules.length} módulos lidos`)).toBeInTheDocument();
});

test("Course_quando_ha_modulo_lido_exibe_selo_lido_no_card", async () => {
  setupFetch();
  localStorage.setItem(READING_PROGRESS_STORAGE_KEY, JSON.stringify(["treino-de-fala-objecoes"]));

  window.location.hash = "#/study";
  render(<AppRoutes />);

  expect(await screen.findByRole("heading", { level: 1, name: "Formação" })).toBeInTheDocument();
  expect(screen.getByText(`1 de ${courseModules.length} módulos lidos`)).toBeInTheDocument();

  const titleEls = screen.getAllByText("Treino de fala (objeções comuns)");
  const anyHasReadClass = titleEls.some((el) => {
    const card = el.closest(".course-module-card");
    return card?.classList.contains("course-module-card--read") ?? false;
  });

  expect(anyHasReadClass).toBe(true);
});

