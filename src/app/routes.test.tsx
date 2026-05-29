import { render, screen } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";
import { AppRoutes } from "./routes";

function renderAtHash(hash: string) {
  window.location.hash = hash;
  return render(<AppRoutes />);
}

beforeEach(() => {
  Object.defineProperty(window, "scrollTo", { value: vi.fn(), writable: true });
});

test("renderiza a tela inicial", () => {
  renderAtHash("#/");
  expect(screen.getByRole("heading", { name: "Apoio para estudo e atendimento" })).toBeInTheDocument();
});

test("abre as telas principais via rotas", () => {
  renderAtHash("#/study");
  expect(screen.getByRole("heading", { name: "Formação" })).toBeInTheDocument();
});

test("abre um módulo do curso", () => {
  renderAtHash("#/study/papel-dermoconsultora");
  expect(screen.getByRole("heading", { name: "Papel da dermoconsultora" })).toBeInTheDocument();
});

test("abre a tela de consulta", () => {
  renderAtHash("#/consult");
  expect(screen.getByRole("heading", { name: "Consulta" })).toBeInTheDocument();
});

test("abre a tela de comparação", () => {
  renderAtHash("#/compare");
  expect(screen.getByRole("heading", { name: "Comparar" })).toBeInTheDocument();
});

test("abre a tela de checklist de segurança", () => {
  renderAtHash("#/safety");
  expect(screen.getByRole("heading", { name: "Checklist de segurança" })).toBeInTheDocument();
});

test("abre a tela de atendimento", () => {
  renderAtHash("#/attend");
  expect(screen.getByRole("heading", { name: "Atender cliente com apoio" })).toBeInTheDocument();
});

test("abre a tela de simulações", () => {
  renderAtHash("#/simulations");
  expect(screen.getByRole("heading", { name: "Simulações de atendimento" })).toBeInTheDocument();
});

test("abre a tela de exercícios", () => {
  renderAtHash("#/exercises");
  expect(screen.getByRole("heading", { name: "Exercícios" })).toBeInTheDocument();
});
