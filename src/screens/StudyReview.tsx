import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { QuizCard } from "../components/course/QuizCard";
import { buildReviewDeck, collectReviewQuestions } from "../study/gamification";
import { useReadingProgress } from "../study/useReadingProgress";

const REVIEW_SIZE = 6;

export function StudyReview() {
  const nav = useNavigate();
  const reading = useReadingProgress();
  const rootRef = useRef<HTMLDivElement | null>(null);

  const available = useMemo(() => collectReviewQuestions(reading.readSet).length, [reading.readSet]);
  const deck = useMemo(() => buildReviewDeck(reading.readSet, REVIEW_SIZE), [reading.readSet]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (rootRef.current) rootRef.current.scrollTop = 0;
  }, []);

  return (
    <div ref={rootRef} className="screen study-screen screen-stack">
      <h1>Revisão</h1>

      <div className="toolbar">
        <Button type="button" variant="secondary" onClick={() => nav("/study")}>
          Voltar para a trilha
        </Button>
      </div>

      {available === 0 ? (
        <div className="notice">
          A revisão reúne perguntas dos módulos que você já concluiu. Conclua um módulo com quiz para liberar.
        </div>
      ) : (
        <>
          <div className="notice">
            Recordação rápida do que você já estudou — {available}{" "}
            {available === 1 ? "pergunta disponível" : "perguntas disponíveis"}. Mostrando até {REVIEW_SIZE}.
          </div>
          <QuizCard quiz={deck} />
        </>
      )}
    </div>
  );
}
