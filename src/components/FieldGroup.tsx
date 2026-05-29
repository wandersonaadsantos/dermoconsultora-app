import type { ReactNode } from "react";

export function FieldGroup(props: { label: string; children: ReactNode }) {
  return (
    <label className="field">
      <div className="field-label">{props.label}</div>
      <div className="field-control">{props.children}</div>
    </label>
  );
}

