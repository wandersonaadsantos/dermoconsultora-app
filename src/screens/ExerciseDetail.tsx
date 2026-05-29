import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { CourseSection } from "../components/course/CourseSection";
import { exercises } from "../exercises/exercises";

export function ExerciseDetail() {
  const nav = useNavigate();
  const { exerciseId } = useParams();

  const ex = useMemo(() => exercises.find((e) => e.id === String(exerciseId ?? "")) ?? null, [exerciseId]);

  if (!ex) {
    return (
      <div className="screen">
        <h1>Exercício não encontrado</h1>
        <div className="toolbar">
          <Button type="button" variant="primary" onClick={() => nav("/exercises")}>
            Voltar para exercícios
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen exercise-detail-screen screen-stack">
      <h1>{ex.title}</h1>
      <div className="toolbar">
        <Button type="button" variant="secondary" onClick={() => nav("/exercises")}>
          Voltar
        </Button>
        <Button type="button" variant="secondary" onClick={() => nav("/attend")}>
          Abrir atendimento
        </Button>
      </div>

      <div className="notice">{ex.summary}</div>

      <CourseSection title="Enunciado">
        <div className="prose">{ex.prompt}</div>
      </CourseSection>

      <CourseSection title="Gabarito">
        <details className="notice">
          <summary className="card-title">Ver gabarito</summary>
          <div className="prose prose-gap">{ex.expectedAnswer}</div>
        </details>
      </CourseSection>
    </div>
  );
}
