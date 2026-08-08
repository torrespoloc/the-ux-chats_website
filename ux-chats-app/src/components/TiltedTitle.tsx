import type { CSSProperties } from "react";

export interface TiltedStrip {
  text: string;
  /** Background color of the strip. Default: var(--ink) */
  bg?: string;
  /** Text color. Default: #fff */
  color?: string;
  /** Independent rotation in degrees. Default: -3 */
  rotation?: number;
  /** Font size override. Default: clamp(36px, 6vw, 78px) */
  fontSize?: string;
}

export interface TiltedTitleProps {
  strips: TiltedStrip[];
  /** How much strips overlap (negative margin-top). Default: -0.35em */
  overlap?: string;
  /** Horizontal alignment of the strip stack */
  align?: "left" | "center";
  className?: string;
  style?: CSSProperties;
}

/** Multi-word title where each word/phrase sits on its own colored background
 *  strip, independently rotated, with deliberate overlap between strips.
 *  Directly matches the "What Recruiters Really Think" Figma design.
 *
 *  Each strip is a filled rectangular block (no border-radius) with padded text,
 *  tilted at its own angle. Strips overlap via negative margin so they read as
 *  a single visual unit while keeping the hand-pasted zine energy. */
export function TiltedTitle({
  strips,
  overlap = "-0.35em",
  align = "left",
  className = "",
  style,
}: TiltedTitleProps) {
  const justifyContent = align === "center" ? "center" : "flex-start";

  return (
    <div
      className={`tilted-title${className ? " " + className : ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: justifyContent,
        ...style,
      }}
    >
      {strips.map((s, i) => (
        <div
          key={i}
          className="tilted-strip-wrapper"
          style={{
            transform: `rotate(${s.rotation ?? -3}deg)`,
            transformOrigin: "left center",
            marginTop: i === 0 ? 0 : overlap,
            position: "relative",
            zIndex: strips.length - i,
            display: "inline-flex",
            maxWidth: "100%",
          }}
        >
          <span
            className="tilted-strip"
            style={{
              display: "inline-block",
              background: s.bg ?? "var(--ink)",
              color: s.color ?? "#fff",
              fontFamily: '"Bricolage Grotesque", sans-serif',
              fontWeight: 800,
              fontSize: s.fontSize ?? "clamp(36px, 6vw, 78px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              padding: "0.15em 0.45em",
              whiteSpace: "nowrap",
            }}
          >
            {s.text}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Backwards-compatible simple API ── */

export interface TiltedWord {
  text: string;
  size?: string;
  color?: string;
  font?: "display" | "body";
  weight?: number;
}

/** Simplified single-rotation title. For the full strip-based design,
 *  use the `strips` prop on TiltedTitle instead. */
export function SimpleTiltedTitle({
  words,
  rotation = -2,
  gap = "0.02em",
  align = "left",
  className = "",
  style,
}: {
  words: TiltedWord[];
  rotation?: number;
  gap?: string;
  align?: "left" | "center";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`tilted-title${className ? " " + className : ""}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        textAlign: align,
        ...style,
      }}
    >
      {words.map((w, i) => {
        const fontFamily =
          w.font === "body"
            ? '"Hanken Grotesk", sans-serif'
            : '"Bricolage Grotesque", sans-serif';
        return (
          <span
            key={i}
            className="tilted-word"
            style={{
              display: "block",
              fontFamily,
              fontWeight: w.weight ?? (w.font === "body" ? 700 : 800),
              fontSize: w.size ?? "clamp(48px, 8vw, 100px)",
              color: w.color ?? "inherit",
              lineHeight: w.font === "body" ? 1.1 : 0.88,
              letterSpacing: w.font === "body" ? "-0.01em" : "-0.03em",
              marginTop: i === 0 ? 0 : gap,
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
}
