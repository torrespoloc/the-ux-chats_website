import type { CSSProperties } from "react";

export interface DotClusterProps {
  colors?: string[];
  count?: number;
  size?: number;
  gap?: number;
  className?: string;
  style?: CSSProperties;
}

const DEFAULTS = ["var(--pink)", "var(--sky)", "var(--yellow)", "var(--purple)", "var(--cream)"];

/** Group of colored dots — lightweight decorative element for poster corners. */
export function DotCluster({
  colors = DEFAULTS,
  count = 4,
  size = 14,
  gap = 6,
  className = "",
  style,
}: DotClusterProps) {
  const dots = Array.from({ length: count }, (_, i) => colors[i % colors.length]);

  return (
    <span
      className={`dot-cluster${className ? " " + className : ""}`}
      style={{ display: "inline-flex", gap, alignItems: "center", ...style }}
      aria-hidden="true"
    >
      {dots.map((c, i) => (
        <span
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: c,
            border: "2px solid var(--ink)",
            flexShrink: 0,
          }}
        />
      ))}
    </span>
  );
}

export interface StarProps {
  color?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
}

/** A single star accent (✦). Use as bullet, divider, or sticker companion. */
export function Star({
  color = "var(--yellow)",
  size = "24px",
  className = "",
  style,
}: StarProps) {
  return (
    <span
      className={`star-accent${className ? " " + className : ""}`}
      style={{
        display: "inline-block",
        fontSize: size,
        color,
        lineHeight: 1,
        fontFamily: "sans-serif",
        ...style,
      }}
      aria-hidden="true"
    >
      ✦
    </span>
  );
}
