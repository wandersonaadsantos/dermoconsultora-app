import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { AppRoutes } from "../app/routes";

function jsonResponse(obj: unknown) {
  return new Response(JSON.stringify(obj), { status: 200, headers: { "Content-Type": "application/json" } });
}

function setupFetch(input?: { products?: any[] }) {
  const products = input?.products ?? [];
  const manifest = {
    version: "v2",
    created_at: new Date().toISOString(),
    total_products: products.length,
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
    if (u.includes("data/v2/base_drogasil_dermoconsulta_enriquecida.json")) return jsonResponse(products);
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

test("Attend_permite_selecionar_ate_3_necessidades_e_bloqueia_a_4a_com_aviso", async () => {
  setupFetch();
  window.location.hash = "#/attend";
  render(<AppRoutes />);

  fireEvent.click(await screen.findByRole("button", { name: "Oleosidade" }));
  fireEvent.click(screen.getByRole("button", { name: "Ressecamento" }));
  fireEvent.click(screen.getByRole("button", { name: "Manchas" }));

  expect(screen.getByText(/3 de 3 selecionadas/)).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Sensibilidade" }));
  expect(screen.getByText("Escolha até 3 para manter a orientação simples.")).toBeInTheDocument();
  expect(screen.getByText(/3 de 3 selecionadas/)).toBeInTheDocument();
});

test("Attend_restaura_step_e_necessidades_pela_URL", async () => {
  setupFetch();
  window.location.hash = "#/attend?step=area&needs=oleosidade,manchas";
  render(<AppRoutes />);

  expect(await screen.findByRole("heading", { name: "2) Qual é a área?" })).toBeInTheDocument();

  const backButtons = screen.getAllByRole("button", { name: "Voltar" });
  fireEvent.click(backButtons[backButtons.length - 1]);
  expect(await screen.findByRole("heading", { name: "1) Quais necessidades a cliente trouxe?" })).toBeInTheDocument();

  expect(screen.getByRole("button", { name: "Oleosidade" }).className).toContain("chip-selected");
  expect(screen.getByRole("button", { name: "Manchas" }).className).toContain("chip-selected");
  expect(screen.getByText(/2 de 3 selecionadas/)).toBeInTheDocument();
});

test("Attend_mostra_indicador_de_progresso", async () => {
  setupFetch();
  window.location.hash = "#/attend";
  render(<AppRoutes />);

  expect(await screen.findByText(/Etapa 1 de 5/)).toBeInTheDocument();
});

test("Attend_mostra_resumo_a_partir_da_etapa_2", async () => {
  setupFetch();
  window.location.hash = "#/attend?step=area&needs=oleosidade,manchas";
  render(<AppRoutes />);

  expect(await screen.findByText("Resumo do atendimento")).toBeInTheDocument();
  expect(screen.getByText("Oleosidade")).toBeInTheDocument();
  expect(screen.getByText("Manchas")).toBeInTheDocument();
});

test("Attend_resultados_prioriza_produtos_que_batem_em_mais_de_uma_necessidade_e_mostra_motivo_humanizado", async () => {
  const p1 = {
    URL_produto: "https://www.drogasil.com.br/p1-111.html",
    Produto: "P1",
    Marca: "M",
    need_tags: "oleosidade|limpeza facial",
    routine_step: "limpeza"
  };
  const p2 = {
    URL_produto: "https://www.drogasil.com.br/p2-222.html",
    Produto: "P2",
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza"
  };
  const p3 = {
    URL_produto: "https://www.drogasil.com.br/p3-333.html",
    Produto: "P3",
    Marca: "M",
    need_tags: "limpeza facial",
    routine_step: "limpeza"
  };

  setupFetch({ products: [p1, p2, p3] });
  window.location.hash = "#/attend";
  render(<AppRoutes />);

  fireEvent.click(await screen.findByRole("button", { name: "Oleosidade" }));
  fireEvent.click(screen.getByRole("button", { name: "Limpeza facial" }));

  fireEvent.click(screen.getByRole("button", { name: "Próxima etapa" }));
  fireEvent.click(await screen.findByRole("button", { name: "Próxima etapa" }));
  fireEvent.click(screen.getByRole("button", { name: "Próxima etapa" }));
  fireEvent.click(screen.getByRole("button", { name: "Próxima etapa" }));

  expect(await screen.findByText("P1")).toBeInTheDocument();
  expect(screen.getByText("Combina com: Oleosidade; Limpeza facial")).toBeInTheDocument();
  expect(screen.queryByText(/need_tags|routine_step|comparison_group|price_tier/)).toBeNull();
});

async function gotoAlertStep() {
  fireEvent.click(await screen.findByRole("button", { name: "Oleosidade" }));
  fireEvent.click(screen.getByRole("button", { name: "Próxima etapa" }));
  fireEvent.click(await screen.findByRole("button", { name: "Próxima etapa" }));
  fireEvent.click(screen.getByRole("button", { name: "Próxima etapa" }));
}

test.each([
  ["Usa medicamento dermatológico"],
  ["Gestante ou lactante"],
  ["Bebê ou criança"]
])("Attend_sub_gatilho_%s_forca_alerta_e_bloqueia_produtos", async (flagLabel) => {
  const p1 = {
    URL_produto: "https://www.drogasil.com.br/p1-111.html",
    Produto: "P1",
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza"
  };

  setupFetch({ products: [p1] });
  window.location.hash = "#/attend";
  render(<AppRoutes />);

  await gotoAlertStep();

  // "Não" segue marcado para o sinal geral, mas o sub-gatilho força o alerta
  fireEvent.click(await screen.findByRole("button", { name: flagLabel }));
  fireEvent.click(screen.getByRole("button", { name: "Próxima etapa" }));

  expect(
    await screen.findByText("Sinal de alerta marcado. Não recomende produto. Chame o farmacêutico.")
  ).toBeInTheDocument();
  expect(screen.queryByText("P1")).toBeNull();
});

test("Attend_sub_gatilho_persiste_na_url_e_e_restaurado", async () => {
  setupFetch();
  window.location.hash = "#/attend?step=alert&needs=oleosidade&area=rosto&alertFlags=gestante";
  render(<AppRoutes />);

  expect(await screen.findByRole("heading", { name: "4) Existe sinal de alerta?" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Gestante ou lactante" }).className).toContain("chip-selected");
  expect(screen.getByText("Chame o farmacêutico antes de indicar qualquer produto.")).toBeInTheDocument();
});

test("Attend_resultados_mostram_checklist_de_rotulo", async () => {
  const p1 = {
    URL_produto: "https://www.drogasil.com.br/p1-111.html",
    Produto: "P1",
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza"
  };
  setupFetch({ products: [p1] });
  window.location.hash = "#/attend?step=results&needs=oleosidade&area=rosto&alert=no";
  render(<AppRoutes />);

  expect(await screen.findByText("P1")).toBeInTheDocument();
  expect(screen.getByText("Confira o rótulo em 1 minuto")).toBeInTheDocument();
  expect(screen.getByText(/Como usar\? \(modo de uso/)).toBeInTheDocument();
});

test("Attend_modo_pressa_tem_3_passos_e_pula_area_e_preferencia", async () => {
  const p1 = {
    URL_produto: "https://www.drogasil.com.br/p1-111.html",
    Produto: "P1",
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza"
  };
  setupFetch({ products: [p1] });
  window.location.hash = "#/attend?mode=pressa";
  render(<AppRoutes />);

  expect(await screen.findByRole("heading", { name: "Atendimento rápido" })).toBeInTheDocument();
  expect(screen.getByText(/Etapa 1 de 3/)).toBeInTheDocument();

  fireEvent.click(await screen.findByRole("button", { name: "Oleosidade" }));
  fireEvent.click(screen.getByRole("button", { name: "Próxima etapa" }));

  // Vai direto para o alerta (sem passos de área/preferência)
  expect(await screen.findByRole("heading", { name: "Existe sinal de alerta?" })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "2) Qual é a área?" })).toBeNull();
  expect(screen.getByText(/Etapa 2 de 3/)).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Próxima etapa" }));
  expect(await screen.findByText("P1")).toBeInTheDocument();
  expect(screen.getByText(/Etapa 3 de 3/)).toBeInTheDocument();
});

test("Attend_modo_pressa_limita_a_2_opcoes", async () => {
  const products = Array.from({ length: 5 }).map((_, i) => ({
    URL_produto: `https://www.drogasil.com.br/p${i}-${i}.html`,
    Produto: `Prod ${i}`,
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza"
  }));
  setupFetch({ products });
  window.location.hash = "#/attend?mode=pressa&step=results&needs=oleosidade";
  render(<AppRoutes />);

  const cards = await screen.findAllByText(/^Prod \d$/);
  expect(cards.length).toBe(2);
});

test("Attend_modo_alerta_mostra_resumo_para_farmaceutico", async () => {
  const p1 = {
    URL_produto: "https://www.drogasil.com.br/p1-111.html",
    Produto: "P1",
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza"
  };
  setupFetch({ products: [p1] });
  window.location.hash = "#/attend?step=results&needs=oleosidade&area=rosto&alert=yes";
  render(<AppRoutes />);

  expect(await screen.findByText("Resumo para passar ao farmacêutico")).toBeInTheDocument();
  expect(screen.getByText(/Necessidade: Oleosidade/)).toBeInTheDocument();
  expect(screen.getByText(/Área: Rosto/)).toBeInTheDocument();
  expect(screen.getByText(/Sinal de alerta: sinal de alerta geral/)).toBeInTheDocument();
  expect(screen.queryByText("P1")).toBeNull();
});

test("Attend_handoff_lista_gatilho_especifico", async () => {
  const p1 = {
    URL_produto: "https://www.drogasil.com.br/p1-111.html",
    Produto: "P1",
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza"
  };
  setupFetch({ products: [p1] });
  window.location.hash = "#/attend?step=results&needs=oleosidade&area=rosto&alert=no&alertFlags=gestante";
  render(<AppRoutes />);

  expect(await screen.findByText(/Sinal de alerta: gestante ou lactante/)).toBeInTheDocument();
});

test("Attend_alerta_bloqueia_produtos_na_etapa_5", async () => {
  const p1 = {
    URL_produto: "https://www.drogasil.com.br/p1-111.html",
    Produto: "P1",
    Marca: "M",
    need_tags: "oleosidade",
    routine_step: "limpeza"
  };

  setupFetch({ products: [p1] });
  window.location.hash = "#/attend";
  render(<AppRoutes />);

  fireEvent.click(await screen.findByRole("button", { name: "Oleosidade" }));
  fireEvent.click(screen.getByRole("button", { name: "Próxima etapa" }));
  fireEvent.click(await screen.findByRole("button", { name: "Próxima etapa" }));
  fireEvent.click(screen.getByRole("button", { name: "Próxima etapa" }));

  fireEvent.click(await screen.findByRole("radio", { name: "Sim" }));
  fireEvent.click(screen.getByRole("button", { name: "Próxima etapa" }));

  expect(await screen.findByText("Sinal de alerta marcado. Não recomende produto. Chame o farmacêutico.")).toBeInTheDocument();
  expect(screen.queryByText("P1")).toBeNull();
});
