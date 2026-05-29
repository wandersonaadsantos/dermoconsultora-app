import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { SafetyChecklist } from "./SafetyChecklist";

afterEach(() => {
  cleanup();
});

test("SafetyChecklist_mostra_regras_e_checklist_de_rotulo", () => {
  render(<SafetyChecklist />);

  expect(screen.getByRole("heading", { level: 1, name: "Checklist de segurança" })).toBeInTheDocument();
  expect(screen.getByText("Confira o rótulo em 1 minuto")).toBeInTheDocument();
  expect(screen.getByText(/Está íntegro e na validade/)).toBeInTheDocument();
});

test("SafetyChecklist_mostra_frases_seguras_por_situacao", () => {
  render(<SafetyChecklist />);

  expect(screen.getByText("Frases seguras por situação")).toBeInTheDocument();
  expect(screen.getByText(/Tô com pressa/)).toBeInTheDocument();
  expect(screen.getByText(/Quero o melhor que tiver/)).toBeInTheDocument();
});
