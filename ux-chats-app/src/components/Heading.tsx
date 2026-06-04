import { createElement, type ReactNode } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

export interface HeadingProps {
  level?: HeadingLevel;
  display?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}

/** Typographic heading. Pass `display={false}` to skip the Bricolage display style. */
export function Heading({
  level = "h2",
  display = true,
  className = "",
  style,
  children,
}: HeadingProps) {
  const cls = `${display ? "display " : ""}${className}`.trim();
  return createElement(level, { className: cls || undefined, style }, children);
}
