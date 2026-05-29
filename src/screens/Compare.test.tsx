import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { AppRoutes } from "../app/routes";

function jsonResponse(obj: unknown) {
  return new Response(JSON.stringify(obj), { status: 200, headers: { "Content-Type": "application/json" } });
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

  const mock = vi.fn(async (url: RequestInfo | URL) => {
    const u = String(url);
    if (u.includes("data/v2/data_freeze_manifest.json")) return jsonResponse(manifest);
    if (u.includes("data/v2/base_drogasil_dermoconsulta_enriquecida.json")) return jsonResponse(input.products);
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

test("Compare_mostra_aviso_para_preferir_2_produtos_quando_3_ou_mais_selecionados_e_exibe_resumo_rapido", async () => {
  const p1 = {
    URL_produto: "https://www.drogasil.com.br/p1-111.html",
    Produto: "P1",
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza",
    comparison_group: "limpeza_facial"
  };
  const p2 = {
    URL_produto: "https://www.drogasil.com.br/p2-222.html",
    Produto: "P2",
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza",
    comparison_group: "limpeza_facial"
  };
  const p3 = {
    URL_produto: "https://www.drogasil.com.br/p3-333.html",
    Produto: "P3",
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza",
    comparison_group: "limpeza_facial"
  };

  setupFetch({ products: [p1, p2, p3] });
  localStorage.setItem("dc:v1:compare", JSON.stringify([p1.URL_produto, p2.URL_produto, p3.URL_produto]));
  window.location.hash = "#/compare";

  render(<AppRoutes />);

  expect(await screen.findByText("Para comparar com clareza, prefira 2 produtos por vez.")).toBeInTheDocument();
  expect(screen.getByText("Resumo rápido")).toBeInTheDocument();
});

test("Compare_corrige_texto_quando_grupos_sao_diferentes_sem_expor_valores_crus", async () => {
  const p1 = {
    URL_produto: "https://www.drogasil.com.br/p1-111.html",
    Produto: "P1",
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza",
    comparison_group: "hidratante_facial"
  };
  const p2 = {
    URL_produto: "https://www.drogasil.com.br/p2-222.html",
    Produto: "P2",
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza",
    comparison_group: "protecao_solar"
  };

  setupFetch({ products: [p1, p2] });
  localStorage.setItem("dc:v1:compare", JSON.stringify([p1.URL_produto, p2.URL_produto]));
  window.location.hash = "#/compare";
  render(<AppRoutes />);

  const phrase = await screen.findAllByText("São relacionados por necessidades parecidas, mas não são substitutos diretos.");
  expect(phrase.length).toBeGreaterThan(0);
  expect(screen.queryByText(/grupos diferentes/i)).toBeNull();
  expect(screen.queryByText(/comparison_group|_outros|protecao_solar|hidratante_facial/)).toBeNull();
});

test("Compare_mostra_aviso_de_grupo_generico_sem_expor_outros_cru", async () => {
  const p1 = {
    URL_produto: "https://www.drogasil.com.br/p1-111.html",
    Produto: "P1",
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza",
    comparison_group: "tratamento_cosmetico_outros"
  };
  const p2 = {
    URL_produto: "https://www.drogasil.com.br/p2-222.html",
    Produto: "P2",
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza",
    comparison_group: "tratamento_cosmetico_outros"
  };

  setupFetch({ products: [p1, p2] });
  localStorage.setItem("dc:v1:compare", JSON.stringify([p1.URL_produto, p2.URL_produto]));
  window.location.hash = "#/compare";
  render(<AppRoutes />);

  const warnings = await screen.findAllByText("Grupo genérico: comparar com cautela.");
  expect(warnings.length).toBeGreaterThan(0);
  expect(screen.queryByText(/_outros/)).toBeNull();
});

test("Compare_restaura_selecao_via_URL_com_ids_canonicos_remove_produto_atualiza_ids_limpar_limpa_query_e_ids_invalidos_sao_ignorados", async () => {
  const p1 = {
    product_id: "p1-111",
    URL_produto: "https://www.drogasil.com.br/p1-111.html",
    Produto: "P1",
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza",
    comparison_group: "limpeza_facial"
  };
  const p2 = {
    product_id: "p2-222",
    URL_produto: "https://www.drogasil.com.br/p2-222.html",
    Produto: "P2",
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza",
    comparison_group: "limpeza_facial"
  };

  setupFetch({ products: [p1, p2] });
  window.location.hash = "#/compare?ids=p1-111,p2-222,nao-existe";
  render(<AppRoutes />);

  expect(await screen.findByText("P1", { selector: ".card-title" })).toBeInTheDocument();
  expect(screen.getByText("P2", { selector: ".card-title" })).toBeInTheDocument();
  expect(screen.getByText("Alguns itens da URL não foram reconhecidos e foram ignorados.")).toBeInTheDocument();
  expect(window.location.hash).not.toContain("drogasil.com.br");

  const p1Card = screen.getByText("P1", { selector: ".card-title" }).closest(".card");
  if (!p1Card) throw new Error("card not found");
  fireEvent.click(within(p1Card).getByRole("button", { name: "Remover da comparação" }));
  await waitFor(() => expect(window.location.hash).not.toContain("p1-111"));

  fireEvent.click(screen.getByRole("button", { name: "Limpar seleção" }));
  await waitFor(() => expect(window.location.hash).toBe("#/compare"));
});
