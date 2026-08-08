import type { CSSProperties } from "react";

export type BlobVariant = "organic" | "squircle" | "droplet" | "cloud";

export interface BackgroundBlobProps {
  variant?: BlobVariant;
  color?: string;
  width?: number;
  height?: number;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}

const blobPaths: Record<BlobVariant, string> = {
  organic:
    "M73.4,15.2C92.5,7.8,117.3,5.2,135.8,12.3c18.4,7.1,30.6,23.9,34.1,42.1c3.5,18.2-1.7,37.8-13.2,52.3c-11.5,14.5-29.3,23.8-47.1,26.4c-17.8,2.6-35.6-1.5-50.2-11.1C44.8,112.4,30,97.1,25.7,79C21.4,60.9,27.7,40,40.4,25.6C53.1,11.2,54.3,22.6,73.4,15.2Z",
  squircle:
    "M52.6,3.4h94.8c27.2,0,49.2,22,49.2,49.2v94.8c0,27.2-22,49.2-49.2,49.2H52.6c-27.2,0-49.2-22-49.2-49.2V52.6C3.4,25.4,25.4,3.4,52.6,3.4Z",
  droplet:
    "M100,6.7c0,0,93.3,86.3,93.3,118.7c0,51.5-41.8,72-93.3,72s-93.3-20.5-93.3-72C6.7,93.1,100,6.7,100,6.7z",
  cloud:
    "M158.2,80.5c0-22.5-14.8-41.7-35.6-47.2c-5.8-16.7-21.8-28.7-40.6-28.7c-20.4,0-37.7,14.4-41.8,33.5c-3.8-1.2-7.8-1.8-12-1.8C12.8,36.3,0,49.1,0,64.9c0,9.4,4.5,17.7,11.5,22.9c1.2,26.9,23.4,48.5,50.6,48.5c9.1,0,17.7-2.4,25.1-6.5c7.6,10.9,20.1,18,34.4,18c23,0,41.7-18.7,41.7-41.7c0-3-0.3-5.9-0.9-8.8C172.2,91,158.2,80.5,158.2,80.5z",
};

/** Organic background blob — decorative SVG shape for poster backgrounds.
 *  Four variants: organic (default amoeba), squircle, droplet, cloud.
 *  Sized in pixels and absolutely positioned by the caller. */
export function BackgroundBlob({
  variant = "organic",
  color = "var(--purple)",
  width = 400,
  height = 400,
  opacity = 0.12,
  className = "",
  style,
}: BackgroundBlobProps) {
  return (
    <svg
      className={`bg-blob${className ? " " + className : ""}`}
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
      width={width}
      height={height}
      style={{
        position: "absolute",
        pointerEvents: "none",
        opacity,
        ...style,
      }}
      aria-hidden="true"
    >
      <path d={blobPaths[variant]} fill={color} />
    </svg>
  );
}

export interface SparkleProps {
  color?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/** Small four-point sparkle/star SVG — the decorative sparkle from the Figma design. */
export function Sparkle({
  color = "var(--yellow)",
  size = 40,
  className = "",
  style,
}: SparkleProps) {
  return (
    <svg
      className={`sparkle${className ? " " + className : ""}`}
      viewBox="0 0 40 40"
      width={size}
      height={size}
      style={{ display: "block", ...style }}
      aria-hidden="true"
    >
      <path
        d="M20,2 L23,14 L34,17 L23,20 L20,32 L17,20 L6,17 L17,14 Z"
        fill={color}
        stroke="var(--ink)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
