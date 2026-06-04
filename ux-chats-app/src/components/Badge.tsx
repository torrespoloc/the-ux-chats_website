import type { ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span className={`badge${className ? " " + className : ""}`}>
      <span className="dot"></span>
      {children}
    </span>
  );
}
