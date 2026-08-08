import type { CSSProperties } from "react";

export interface PartnershipLockupProps {
  brandA: string;
  brandB: string;
  mode?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
}

const sizeMap = {
  sm: { brand: "clamp(28px, 4vw, 42px)", cross: "clamp(20px, 3vw, 32px)" },
  md: { brand: "clamp(40px, 6vw, 64px)", cross: "clamp(28px, 4vw, 48px)" },
  lg: { brand: "clamp(56px, 8vw, 96px)", cross: "clamp(36px, 5vw, 60px)" },
};

/** "UX Chats × Partner Name" lockup for partnership posters.
 *  Bold, tilted, fun — the cross is the graphic element. */
export function PartnershipLockup({
  brandA,
  brandB,
  mode = "light",
  size = "md",
  className = "",
  style,
}: PartnershipLockupProps) {
  const s = sizeMap[size];
  const ink = mode === "dark" ? "var(--cream)" : "var(--ink)";
  const accent = mode === "dark" ? "var(--yellow)" : "var(--purple)";

  return (
    <div
      className={`partnership-lockup${className ? " " + className : ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        fontFamily: '"Bricolage Grotesque", sans-serif',
        fontWeight: 800,
        lineHeight: 0.92,
        letterSpacing: "-0.02em",
        transform: "rotate(-1.5deg)",
        ...style,
      }}
    >
      <span style={{ fontSize: s.brand, color: ink }}>{brandA}</span>
      <span
        style={{
          fontSize: s.cross,
          color: accent,
          lineHeight: 0.7,
          transform: "rotate(5deg)",
        }}
      >
        ×
      </span>
      <span style={{ fontSize: s.brand, color: ink }}>{brandB}</span>
    </div>
  );
}
