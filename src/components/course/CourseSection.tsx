import type { ReactNode } from "react";

export type CourseSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function CourseSection(props: CourseSectionProps) {
  return (
    <section>
      <h2>{props.title}</h2>
      {props.description ? <div className="hint">{props.description}</div> : null}
      {props.children}
    </section>
  );
}

