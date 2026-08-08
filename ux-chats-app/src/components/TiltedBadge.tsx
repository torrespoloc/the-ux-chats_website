import type { ReactNode, CSSProperties } from "react";

export type TiltedBadgeColor = "yellow" | "pink" | "sky" | "purple" | "cream" | "ink" | "blue";
export type TiltedBadgeSize = "sm" | "md" | "lg";
export type TiltedBadgeShadow = "hard" | "soft" | "none";

export interface TiltedBadgeProps {
  children: ReactNode;
  color?: TiltedBadgeColor;
  rotation?: number;
  size?: TiltedBadgeSize;
  shadow?: TiltedBadgeShadow;
  float?: boolean;
  className?: string;
  style?: CSSProperties;
}

const colorMap: Record<TiltedBadgeColor, { bg: string; text: string }> = {
  yellow: { bg: "var(--yellow)", text: "var(--ink)" },
  pink: { bg: "#e60067", text: "#fff" },
  sky: { bg: "var(--sky)", text: "var(--ink)" },
  purple: { bg: "var(--purple)", text: "#fff" },
  cream: { bg: "var(--cream)", text: "var(--ink)" },
  ink: { bg: "var(--ink)", text: "var(--cream)" },
  blue: { bg: "#2e70ff", text: "#fff" },
};

const sizeMap: Record<TiltedBadgeSize, { fontSize: string; padding: string }> = {
  sm: { fontSize: "clamp(12px, 2vw, 16px)", padding: "0.35em 0.9em" },
  md: { fontSize: "clamp(16px, 2.5vw, 22px)", padding: "0.45em 1.1em" },
  lg: { fontSize: "clamp(20px, 3.5vw, 30px)", padding: "0.5em 1.3em" },
};

const shadowMap: Record<TiltedBadgeShadow, string> = {
  hard: "var(--shadow)",
  soft: "0px 4px 12px rgba(0,0,0,0.15)",
  none: "none",
};

/** Floating rotated pill badge — matches the Figma floating tag design.
 *  Rounded-full pill with colored fill, independent rotation, and
 *  optional float animation. Soft shadow for poster contexts,
 *  hard shadow for the sticker-zine look. */
export function TiltedBadge({
  children,
  color = "yellow",
  rotation = -4,
  size = "md",
  shadow = "hard",
  float = false,
  className = "",
  style,
}: TiltedBadgeProps) {
  const c = colorMap[color];
  const s = sizeMap[size];
  const floatClass = float ? " tilted-badge-float" : "";

  return (
    <span
      className={`tilted-badge${floatClass}${className ? " " + className : ""}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: c.bg,
        color: c.text,
        borderRadius: "999px",
        padding: s.padding,
        fontFamily: '"Hanken Grotesk", sans-serif',
        fontWeight: 700,
        fontSize: s.fontSize,
        lineHeight: 1.1,
        textAlign: "center",
        whiteSpace: "nowrap",
        boxShadow: shadowMap[shadow],
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        cursor: "default",
        userSelect: "none",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
