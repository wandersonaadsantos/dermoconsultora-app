import type { CourseModule } from "../../course/courseTypes";
import { Button } from "../Button";

export type CourseModuleCardProps = {
  module: CourseModule;
  onOpen: () => void;
  isRead?: boolean;
};

export function CourseModuleCard(props: CourseModuleCardProps) {
  const cls = ["notice", "course-module-card", props.isRead ? "course-module-card--read" : ""].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      <div className="card-title">{props.module.title}</div>
      <div className="card-subtitle">{props.module.summary}</div>
      <div className="toolbar toolbar-in-card">
        <Button type="button" variant="primary" onClick={props.onOpen}>
          Abrir módulo
        </Button>
      </div>
    </div>
  );
}
