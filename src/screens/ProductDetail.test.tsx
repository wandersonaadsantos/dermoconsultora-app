import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { AppRoutes } from "../app/routes";

function jsonResponse(obj: unknown) {
  return new Response(JSON.stringify(obj), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

function setupFetch(input: { products: any[] }) {
  const manifest = {
    version: "v2",
    created_at: new Date().toISOString(),
    total_products: input.products.length,
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
  cleanup();
  vi.unstubAllGlobals();
});

test("ProductDetail_exibe_codigo_drogasil_e_nao_expoe_url_gigante_no_texto", async () => {
  const url = "https://www.drogasil.com.br/produto-x-1318168.html";
  setupFetch({
    products: [
      {
        URL_produto: url,
        Produto: "Produto X",
        Marca: "Darrow",
        drogasil_product_code: "1318168",
        quantity: "400g",
        comparison_group: "gel_limpeza_facial",
        routine_step: "limpeza",
        need_tags: "oleosidade"
      }
    ]
  });

  window.location.hash = `#/product/${encodeURIComponent(url)}`;
  render(<AppRoutes />);

  expect(await screen.findByText("Código Drogasil")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Copiar código" })).toBeInTheDocument();
  const urlNodes = screen.getAllByText(url);
  expect(urlNodes.length).toBe(1);
  expect(urlNodes[0]?.closest("details")).not.toBeNull();
});

test("ProductDetail_extrai_codigo_drogasil_da_url_quando_campo_faltar", async () => {
  const url = "https://www.drogasil.com.br/produto-x-1318168.html";
  setupFetch({
    products: [
      {
        URL_produto: url,
        Produto: "Produto X",
        Marca: "Darrow",
        comparison_group: "gel_limpeza_facial",
        routine_step: "limpeza",
        need_tags: "oleosidade"
      }
    ]
  });

  window.location.hash = `#/product/${encodeURIComponent(url)}`;
  render(<AppRoutes />);

  expect(await screen.findByText("Código Drogasil")).toBeInTheDocument();
  expect(screen.getByText("1318168")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Copiar código" })).not.toBeDisabled();
});

test("ProductDetail_link_ver_produto_no_site_dispara_window_open", async () => {
  const url = "https://www.drogasil.com.br/produto-x-1318168.html";
  setupFetch({
    products: [
      {
        URL_produto: url,
        Produto: "Produto X",
        Marca: "Darrow",
        drogasil_product_code: "1318168",
        comparison_group: "gel_limpeza_facial",
        routine_step: "limpeza",
        need_tags: "oleosidade"
      }
    ]
  });

  const openSpy = vi.spyOn(window, "open").mockReturnValue(null as any);
  window.location.hash = `#/product/${encodeURIComponent(url)}`;
  render(<AppRoutes />);

  const link = await screen.findByRole("link", { name: "Ver produto no site" });
  fireEvent.click(link);
  expect(openSpy).toHaveBeenCalledWith(url, "_blank", "noopener,noreferrer");
});

test("ProductDetail_mostra_como_usar_quando_site_how_to_use_existir", async () => {
  const url = "https://www.drogasil.com.br/produto-x-1318168.html";
  setupFetch({
    products: [
      {
        URL_produto: url,
        Produto: "Produto X",
        Marca: "Darrow",
        drogasil_product_code: "1318168",
        site_how_to_use: "Aplicar sobre a pele molhada e enxaguar.",
        comparison_group: "gel_limpeza_facial",
        routine_step: "limpeza",
        need_tags: "oleosidade"
      }
    ]
  });

  window.location.hash = `#/product/${encodeURIComponent(url)}`;
  render(<AppRoutes />);

  expect(await screen.findByText("Como usar")).toBeInTheDocument();
  expect(screen.getByText("Aplicar sobre a pele molhada e enxaguar.")).toBeInTheDocument();
});

test("ProductDetail_mantem_confirmar_no_rotulo_quando_secao_do_site_faltar", async () => {
  const url = "https://www.drogasil.com.br/produto-y.html";
  setupFetch({
    products: [
      {
        URL_produto: url,
        Produto: "Produto Y",
        Marca: "Marca Y",
        comparison_group: "g2",
        routine_step: "outros"
      }
    ]
  });

  window.location.hash = `#/product/${encodeURIComponent(url)}`;
  render(<AppRoutes />);

  expect(await screen.findByRole("heading", { name: "Informações do site Drogasil" })).toBeInTheDocument();
  expect(
    screen.getByText("Este produto ainda não tem conteúdo do site na base. Abra no site e confirme no rótulo antes de orientar.")
  ).toBeInTheDocument();
  expect(screen.getAllByText("Informação não encontrada na base atual. Confirmar no rótulo antes de orientar.").length).toBeGreaterThan(0);
});

test("ProductDetail_faz_scroll_para_topo_ao_abrir_ficha", async () => {
  const url = "https://www.drogasil.com.br/produto-x-1318168.html";
  setupFetch({
    products: [
      {
        URL_produto: url,
        Produto: "Produto X",
        Marca: "Darrow",
        drogasil_product_code: "1318168",
        comparison_group: "gel_limpeza_facial",
        routine_step: "limpeza",
        need_tags: "oleosidade"
      }
    ]
  });

  const scrollSpy = vi.fn();
  vi.stubGlobal("scrollTo", scrollSpy);

  window.location.hash = `#/product/${encodeURIComponent(url)}`;
  render(<AppRoutes />);

  expect(await screen.findByText("Código Drogasil")).toBeInTheDocument();
  expect(scrollSpy).toHaveBeenCalledWith(0, 0);
});
