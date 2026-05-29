import type { ButtonHTMLAttributes } from "react";

export type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  selected?: boolean;
};

export function Chip(props: ChipProps) {
  const { selected = false, className, role, ...rest } = props;
  const cn = ["chip", selected ? "chip-selected" : "chip-unselected", className].filter(Boolean).join(" ");
  const stateProps = role === "radio" ? { role, "aria-checked": selected } : { "aria-pressed": selected };
  return <button {...rest} {...stateProps} type="button" className={cn} />;
}

