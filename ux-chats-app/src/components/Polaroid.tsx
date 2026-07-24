import type { ReactNode } from "react";

export interface PolaroidProps {
  src: string;
  alt: string;
  caption: ReactNode;
  className?: string;
  /** Rotation in degrees. Defaults to a slight random tilt. */
  rotate?: number;
}

export function Polaroid({
  src,
  alt,
  caption,
  className = "",
  rotate,
}: PolaroidProps) {
  const rot = rotate ?? (Math.random() * 8 - 4);
  return (
    <div
      className={`polaroid${className ? " " + className : ""}`}
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <img src={src} alt={alt} />
      <div className="cap">{caption}</div>
    </div>
  );
}
