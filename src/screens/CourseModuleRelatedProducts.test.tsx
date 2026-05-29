import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { AppRoutes } from "../app/routes";

function jsonResponse(obj: unknown) {
  return new Response(JSON.stringify(obj), { status: 200, headers: { "Content-Type": "application/json" } });
}

function setupFetch(input: { products: any[] }) {
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

  const images: any[] = [];

  const mock = vi.fn(async (url: RequestInfo | URL) => {
    const u = String(url);
    if (u.includes("data/v2/data_freeze_manifest.json")) return jsonResponse(manifest);
    if (u.includes("data/v2/base_drogasil_dermoconsulta_enriquecida.json")) return jsonResponse(input.products);
    if (u.includes("data/v2/images_manifest.json")) return jsonResponse(images);
    return new Response("not found", { status: 404 });
  });

  vi.stubGlobal("fetch", mock);
  return mock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

test("CourseModule_exemplos_reais_abrem_ficha_e_permitem_comparar", async () => {
  setupFetch({
    products: [
      {
        URL_produto: "https://www.drogasil.com.br/protetor-solar-com-cor-x.html",
        Produto: "Protetor Solar com Cor FPS 50",
        Marca: "Marca A",
        routine_step: "protecao",
        comparison_group: "protetor_solar"
      },
      {
        URL_produto: "https://www.drogasil.com.br/hidratante-facial-y.html",
        Produto: "Hidratante Facial Suave",
        Marca: "Marca B",
        routine_step: "hidratacao",
        comparison_group: "hidratante_facial"
      }
    ]
  });

  Object.defineProperty(window, "scrollTo", { value: vi.fn(), writable: true });
  window.location.hash = "#/study/treino-de-fala-objecoes";
  render(<AppRoutes />);

  expect(await screen.findByRole("heading", { level: 2, name: "Produtos reais (exemplos)" })).toBeInTheDocument();
  expect(screen.getByText("Protetor com cor (exemplos)")).toBeInTheDocument();

  const compareButtons = await screen.findAllByRole("button", { name: "Comparar" });
  fireEvent.click(compareButtons[0]!);
  expect(await screen.findByRole("button", { name: "Remover da comparação" })).toBeInTheDocument();

  const openButtons = await screen.findAllByRole("button", { name: "Abrir ficha" });
  fireEvent.click(openButtons[0]!);

  expect(await screen.findByRole("heading", { level: 1, name: "Ficha do produto" })).toBeInTheDocument();
  expect(await screen.findByRole("heading", { level: 2, name: "Protetor Solar com Cor FPS 50" })).toBeInTheDocument();
});
