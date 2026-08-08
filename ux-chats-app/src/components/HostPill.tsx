import type { CSSProperties } from "react";

export interface HostPillProps {
  /** The prefix text, e.g. "with" or "hosted by" */
  prefix: string;
  /** The bold name */
  name: string;
  /** Border and shadow accent color. Default: purple */
  accent?: string;
  /** Background. Default: white */
  background?: string;
  /** Text color. Default: var(--ink) */
  textColor?: string;
  className?: string;
  style?: CSSProperties;
}

/** White pill with colored border + colored drop shadow, two-part text.
 *  Matches the "with Carl Wheatley" element from the Figma design.
 *  The prefix is regular weight, the name is extra bold. */
export function HostPill({
  prefix,
  name,
  accent = "var(--purple)",
  background = "#fff",
  textColor = "var(--ink)",
  className = "",
  style,
}: HostPillProps) {
  return (
    <div
      className={`host-pill${className ? " " + className : ""}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3em",
        background,
        color: textColor,
        border: `3px solid ${accent}`,
        borderRadius: "32px",
        padding: "0.55em 1.4em",
        fontFamily: '"Hanken Grotesk", sans-serif',
        fontSize: "clamp(16px, 2.5vw, 22px)",
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        boxShadow: `0px 10px 0px ${accent}30`,
        ...style,
      }}
    >
      <span style={{ fontWeight: 400, opacity: 0.75 }}>{prefix}</span>
      <span style={{ fontWeight: 800 }}>{name}</span>
    </div>
  );
}
