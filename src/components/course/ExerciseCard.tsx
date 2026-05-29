import type { CourseExercise } from "../../course/courseTypes";

export type ExerciseCardProps = {
  exercise: CourseExercise;
};

export function ExerciseCard(props: ExerciseCardProps) {
  return (
    <div className="notice">
      <div className="warning-title">Exercício</div>
      <div className="exercise-prompt">{props.exercise.prompt}</div>
      <details>
        <summary className="hint exercise-summary">Ver gabarito</summary>
        <div className="exercise-answer">{props.exercise.expectedAnswer}</div>
      </details>
    </div>
  );
}
