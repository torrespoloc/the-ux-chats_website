import type { CSSProperties } from "react";

export interface CurvedDividerProps {
  color?: string;
  width?: string;
  height?: string;
  flip?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Wavy decorative divider — SVG path that draws a gentle curve.
 *  Used between poster sections or as a playful underline. */
export function CurvedDivider({
  color = "var(--purple)",
  width = "100%",
  height = "24px",
  flip = false,
  className = "",
  style,
}: CurvedDividerProps) {
  const d = flip
    ? "M0,20 Q25,0 50,20 T100,20"
    : "M0,4 Q25,24 50,4 T100,4";

  return (
    <svg
      className={`curved-divider${className ? " " + className : ""}`}
      viewBox="0 0 100 24"
      preserveAspectRatio="none"
      style={{
        display: "block",
        width,
        height,
        ...style,
      }}
      aria-hidden="true"
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface SquiggleUnderlineProps {
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Wavy underline effect using CSS text-decoration. Wrap around a word. */
export function SquiggleUnderline({
  color = "var(--purple)",
  className = "",
  style,
}: SquiggleUnderlineProps) {
  return (
    <span
      className={`squiggle-underline${className ? " " + className : ""}`}
      style={{
        textDecoration: `underline wavy ${color} 3px`,
        textUnderlineOffset: "6px",
        ...style,
      }}
    />
  );
}
