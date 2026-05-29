import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button(props: ButtonProps) {
  const { variant = "primary", className, ...rest } = props;
  const cn = ["btn", `btn-${variant}`, className].filter(Boolean).join(" ");
  return <button {...rest} className={cn} />;
}

