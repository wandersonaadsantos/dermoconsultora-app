import { describe, expect, test } from "vitest";
import { courseModules } from "./courseModules";

describe("courseModules", () => {
  test("inclui os módulos essenciais da M5.1", () => {
    const ids = new Set(courseModules.map((m) => m.id));
    expect(ids.has("papel-dermoconsultora")).toBe(true);
    expect(ids.has("atendimento-consultivo")).toBe(true);
    expect(ids.has("tipos-condicoes-pele")).toBe(true);
    expect(ids.has("skincare-basico")).toBe(true);
    expect(ids.has("protecao-solar")).toBe(true);
    expect(ids.has("leitura-rotulo")).toBe(true);
    expect(ids.has("sinais-alerta-encaminhamento")).toBe(true);
  });

  test("inclui módulos práticos da M5.3", () => {
    const ids = new Set(courseModules.map((m) => m.id));
    expect(ids.has("categorias-de-loja")).toBe(true);
    expect(ids.has("comparar-parecidos")).toBe(true);
    expect(ids.has("treino-de-fala-objecoes")).toBe(true);
  });

  test("M6.1_tipos_condicoes_pele_tem_estrutura_e_pontos_obrigatorios", () => {
    const m = courseModules.find((x) => x.id === "tipos-condicoes-pele");
    expect(m).toBeDefined();
    const module = m!;

    expect(module.objective).toContain("Você vai aprender:");
    expect(module.objective).toContain("Em uma frase:");

    expect(module.content).toContain("Na prática do balcão");
    expect(module.content).toContain("Perguntas úteis");
    expect(module.content).toContain("Como explicar para a cliente");
    expect(module.content).toContain("Quando chamar farmacêutico");

    expect(module.content).toContain("espinhas");
    expect(module.content).toContain("manchas");
    expect(module.content).toContain("vermelhidão");
    expect(module.content).toContain("ardência");

    expect(module.exercise.prompt).toContain("tipo");
    expect(module.exercise.prompt).toContain("condição");
    expect(module.exercise.expectedAnswer).toContain("chamar o farmacêutico");
  });

  test("todo módulo segue o template (campos obrigatórios)", () => {
    for (const m of courseModules) {
      expect(m.title.trim().length).toBeGreaterThan(0);
      expect(m.summary.trim().length).toBeGreaterThan(0);
      expect(m.objective.trim().length).toBeGreaterThan(0);
      expect(m.content.trim().length).toBeGreaterThan(0);
      expect(m.practicalExample.trim().length).toBeGreaterThan(0);
      expect(m.safePhrase.trim().length).toBeGreaterThan(0);
      expect(m.avoid.trim().length).toBeGreaterThan(0);
      expect(m.exercise.prompt.trim().length).toBeGreaterThan(0);
      expect(m.exercise.expectedAnswer.trim().length).toBeGreaterThan(0);
    }
  });
});
