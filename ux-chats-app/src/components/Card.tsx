import type { ReactNode } from "react";

export interface CardProps {
  variant?: "default" | "purple";
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}

export function Card({
  variant = "default",
  children,
  className = "",
  as: Tag = "div",
}: CardProps) {
  const cls = `card${variant === "purple" ? " p" : ""}${className ? " " + className : ""}`;
  return <Tag className={cls}>{children}</Tag>;
}
