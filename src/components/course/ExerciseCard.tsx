import type { CourseExercise } from "../../course/courseTypes";

export type ExerciseCardProps = {
  exercise: CourseExercise;
};

export function ExerciseCard(props: ExerciseCardProps) {
  return (
    <div className="notice">
      <div className="warning-title">Exercício</div>
      <div style={{ marginBottom: 10 }}>{props.exercise.prompt}</div>
      <details>
        <summary className="hint" style={{ marginTop: 0 }}>
          Ver gabarito
        </summary>
        <div style={{ marginTop: 10 }}>{props.exercise.expectedAnswer}</div>
      </details>
    </div>
  );
}
