import type { ButtonHTMLAttributes } from "react";

export type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  selected?: boolean;
};

export function Chip(props: ChipProps) {
  const { selected = false, className, ...rest } = props;
  const cn = ["chip", selected ? "chip-selected" : "chip-unselected", className].filter(Boolean).join(" ");
  return <button {...rest} type="button" className={cn} />;
}

