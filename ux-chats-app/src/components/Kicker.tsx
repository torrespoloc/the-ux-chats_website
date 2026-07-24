import type { ReactNode, CSSProperties } from "react";

export interface KickerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "span" | "p" | "div";
}

/** Eyebrow label – uppercase, letter-spaced, purple */
export function Kicker({
  children,
  className = "",
  style,
  as: Tag = "span",
}: KickerProps) {
  return <Tag className={`kicker${className ? " " + className : ""}`} style={style}>{children}</Tag>;
}
