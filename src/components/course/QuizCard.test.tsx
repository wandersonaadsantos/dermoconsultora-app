import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { QuizCard } from "./QuizCard";

afterEach(() => {
  cleanup();
});

const quiz = [
  { question: "Pergunta 1?", options: ["A", "B"], correctIndex: 1, explanation: "Explicação 1" },
  { question: "Pergunta 2?", options: ["C", "D"], correctIndex: 0 }
];

test("QuizCard dá feedback, avança e chama onComplete ao concluir", () => {
  const onComplete = vi.fn();
  render(<QuizCard quiz={quiz} onComplete={onComplete} />);

  expect(screen.getByText("Pergunta 1 de 2")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "B" }));
  expect(screen.getByText("Correto.")).toBeInTheDocument();
  expect(screen.getByText("Explicação 1")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Próxima" }));
  expect(screen.getByText("Pergunta 2 de 2")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "C" }));
  fireEvent.click(screen.getByRole("button", { name: "Concluir" }));

  expect(onComplete).toHaveBeenCalledTimes(1);
  expect(screen.getByText(/Você acertou 2 de 2/)).toBeInTheDocument();
});

test("QuizCard sinaliza escolha incorreta", () => {
  render(<QuizCard quiz={[{ question: "Q?", options: ["X", "Y"], correctIndex: 0 }]} />);
  fireEvent.click(screen.getByRole("button", { name: "Y" }));
  expect(screen.getByText("Não é a melhor escolha.")).toBeInTheDocument();
});
