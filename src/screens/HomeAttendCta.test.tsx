import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { AppRoutes } from "../app/routes";

afterEach(() => {
  cleanup();
});

test("CTA 'Atender cliente com apoio' abre /attend", () => {
  window.location.hash = "#/";
  render(<AppRoutes />);

  fireEvent.click(screen.getByRole("button", { name: "Atender cliente com apoio" }));
  expect(screen.getByRole("heading", { name: "Atender cliente com apoio" })).toBeInTheDocument();
});

test("CTA 'Atendimento rápido' abre /attend em modo pressa", () => {
  window.location.hash = "#/";
  render(<AppRoutes />);

  fireEvent.click(screen.getByRole("button", { name: "Atendimento rápido" }));
  expect(screen.getByRole("heading", { name: "Atendimento rápido" })).toBeInTheDocument();
});

