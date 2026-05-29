import { fireEvent, render, screen, within } from "@testing-library/react";
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

test("Course_exibe_sequencia_recomendada_pratica", async () => {
  setupFetch();
  window.location.hash = "#/study";
  render(<AppRoutes />);

  const heading = await screen.findByRole("heading", { level: 2, name: "Sequência recomendada (prática)" });
  const section = heading.closest("section");
  expect(section).not.toBeNull();

  const titles = within(section as HTMLElement)
    .getAllByText(/.+/, { selector: ".card-title" })
    .map((n) => String(n.textContent ?? "").trim());

  expect(titles).toEqual([
    "Atendimento consultivo",
    "Leitura de rótulo",
    "Tipos e condições da pele",
    "Skincare básico",
    "Proteção solar",
    "Categorias de loja (na prática)",
    "Comparar produtos parecidos",
    "Treino de fala (objeções comuns)",
    "Simulações de atendimento",
    "Checklist rápido"
  ]);

  fireEvent.click(within(section as HTMLElement).getByRole("button", { name: "Começar pela sequência" }));
  expect(await screen.findByRole("heading", { level: 1, name: "Atendimento consultivo" })).toBeInTheDocument();
});
