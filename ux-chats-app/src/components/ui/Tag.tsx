import type { ReactNode, HTMLAttributes } from "react";

type TagVariant = "default" | "yellow" | "sky" | "pink";
type TagSize = "sm" | "md";
type TagShape = "pill" | "square";

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children" | "className"> {
  variant?: TagVariant;
  size?: TagSize;
  shape?: TagShape;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<TagVariant, string> = {
  default: "border-[var(--purple)] bg-white [--tag-shadow:var(--purple)]",
  yellow:  "border-[var(--yellow)] bg-white [--tag-shadow:var(--yellow)]",
  sky:     "border-[var(--sky)] bg-white [--tag-shadow:var(--sky)]",
  pink:    "border-[var(--pink)] bg-white [--tag-shadow:var(--pink)]",
};

const sizeStyles: Record<TagSize, string> = {
  sm: "px-[16px] py-[8px]",
  md: "px-[24px] py-[16px]",
};

const shapeStyles: Record<TagShape, string> = {
  pill: "rounded-full",
  square: "rounded-[12px]",
};

export function Tag({
  variant = "default",
  size = "md",
  shape = "square",
  children,
  className = "",
  ...rest
}: TagProps) {
  const baseClasses =
    "inline-flex items-center font-['Hanken_Grotesk'] font-extrabold leading-none text-[16px] text-[var(--ink)] " +
    "border-[3px] border-solid " +
    "shadow-[6px_6px_0_var(--tag-shadow)] " +
    "select-none " +
    variantStyles[variant] + " " +
    sizeStyles[size] + " " +
    shapeStyles[shape] + " " +
    className;

  return (
    <span className={baseClasses.trim()} {...rest}>
      {'#'}{children}
    </span>
  );
}
