import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { AppRoutes } from "../app/routes";
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

function setupScrollTo() {
  Object.defineProperty(window, "scrollTo", { value: vi.fn(), writable: true });
}

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.unstubAllGlobals();
});

test("CourseModule_quando_nao_lido_exibe_botao_marcar_como_lido", async () => {
  setupFetch();
  setupScrollTo();
  window.location.hash = "#/study/treino-de-fala-objecoes";
  render(<AppRoutes />);

  expect(await screen.findByRole("heading", { level: 1, name: "Treino de fala (objeções comuns)" })).toBeInTheDocument();
  expect(await screen.findByRole("button", { name: "Marcar como lido" })).toBeInTheDocument();
  expect(screen.queryByText("Módulo marcado como lido")).not.toBeInTheDocument();
  expect(localStorage.getItem(READING_PROGRESS_STORAGE_KEY)).toBeNull();
});

test("CourseModule_marcar_e_desmarcar_atualiza_ui_e_localStorage", async () => {
  setupFetch();
  setupScrollTo();
  window.location.hash = "#/study/treino-de-fala-objecoes";
  render(<AppRoutes />);

  expect(await screen.findByRole("heading", { level: 1, name: "Treino de fala (objeções comuns)" })).toBeInTheDocument();

  fireEvent.click(await screen.findByRole("button", { name: "Marcar como lido" }));

  expect(await screen.findByText("Módulo marcado como lido")).toBeInTheDocument();
  expect(await screen.findByRole("button", { name: "Desmarcar" })).toBeInTheDocument();

  await waitFor(() => {
    expect(localStorage.getItem(READING_PROGRESS_STORAGE_KEY)).toBe(JSON.stringify(["treino-de-fala-objecoes"]));
  });

  expect(localStorage.getItem(`dc:v1:${READING_PROGRESS_STORAGE_KEY}`)).toBeNull();

  fireEvent.click(screen.getByRole("button", { name: "Desmarcar" }));
  expect(await screen.findByRole("button", { name: "Marcar como lido" })).toBeInTheDocument();

  await waitFor(() => {
    expect(localStorage.getItem(READING_PROGRESS_STORAGE_KEY)).toBe(JSON.stringify([]));
  });
});
