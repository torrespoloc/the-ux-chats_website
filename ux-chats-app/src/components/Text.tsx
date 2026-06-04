import type { ReactNode, ElementType } from "react";

export interface TextProps {
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}

export function Text({
  as: Tag = "p",
  className = "",
  style,
  children,
}: TextProps) {
  return <Tag className={className || undefined} style={style}>{children}</Tag>;
}
