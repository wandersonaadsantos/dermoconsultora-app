import { useState } from "react";
import { Button } from "../Button";
import type { QuizQuestion } from "../../course/courseTypes";

export type QuizCardProps = {
  quiz: QuizQuestion[];
  onComplete?: () => void;
};

export function QuizCard({ quiz, onComplete }: QuizCardProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (quiz.length === 0) return null;

  if (finished) {
    return (
      <div className="quiz-card">
        <div className="quiz-result">
          Você acertou {score} de {quiz.length}. Módulo concluído ✓
        </div>
        <div className="hint">Recordar ativamente fixa mais que reler. Se errou algo, vale reler aquele trecho.</div>
      </div>
    );
  }

  const q = quiz[index];
  const answered = selected !== null;
  const isLast = index === quiz.length - 1;

  const choose = (i: number) => {
    if (answered) return;
    setSelected(i);
    if (i === q.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (isLast) {
      setFinished(true);
      onComplete?.();
      return;
    }
    setIndex((n) => n + 1);
    setSelected(null);
  };

  return (
    <div className="quiz-card">
      <div className="quiz-progress">
        Pergunta {index + 1} de {quiz.length}
      </div>
      <div className="quiz-question">{q.question}</div>
      <div className="quiz-options">
        {q.options.map((opt, i) => {
          const state = !answered ? "" : i === q.correctIndex ? "is-correct" : i === selected ? "is-wrong" : "";
          return (
            <button
              key={opt}
              type="button"
              className={["quiz-option", state].filter(Boolean).join(" ")}
              onClick={() => choose(i)}
              disabled={answered}
              aria-pressed={selected === i}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {answered ? (
        <div className="quiz-feedback" role="status" aria-live="polite">
          <div className={selected === q.correctIndex ? "quiz-feedback-ok" : "quiz-feedback-no"}>
            {selected === q.correctIndex ? "Correto." : "Não é a melhor escolha."}
          </div>
          {q.explanation ? <div className="hint">{q.explanation}</div> : null}
          <div className="toolbar toolbar-in-card">
            <Button type="button" variant="primary" onClick={next}>
              {isLast ? "Concluir" : "Próxima"}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
