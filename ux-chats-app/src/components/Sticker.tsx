import type { ReactNode, CSSProperties } from "react";

type StickerVariant = "pink" | "sky" | "yellow";

export interface StickerProps {
  variant?: StickerVariant;
  children: ReactNode;
  /** Override the rotation in degrees. Default differs by variant. */
  rotate?: number;
  /** Use pill shape instead of the default shape */
  pill?: boolean;
  className?: string;
  style?: CSSProperties;
}

const variantClasses: Record<StickerVariant, string> = {
  pink: "st-pink",
  sky: "st-sky",
  yellow: "st-yellow",
};

/** Inline positioning – caller places via className or style. */
export function Sticker({
  variant = "pink",
  children,
  pill = false,
  className = "",
  style,
}: StickerProps) {
  const shape = pill ? "st-pill" : "";
  return (
    <span
      className={`sticker ${variantClasses[variant]} ${shape}${className ? " " + className : ""}`}
      style={style}
    >
      {children}
    </span>
  );
}
