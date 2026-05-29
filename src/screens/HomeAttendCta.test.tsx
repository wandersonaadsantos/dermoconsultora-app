import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { AppRoutes } from "../app/routes";

test("CTA 'Atender cliente com apoio' abre /attend", () => {
  window.location.hash = "#/";
  render(<AppRoutes />);

  fireEvent.click(screen.getByRole("button", { name: "Atender cliente com apoio" }));
  expect(screen.getByRole("heading", { name: "Atender cliente agora" })).toBeInTheDocument();
});

