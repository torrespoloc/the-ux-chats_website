import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "yellow" | "line" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & { as?: "button" };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & { as: "a"; href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[var(--purple)] text-white",
  yellow: "bg-[var(--yellow)] text-[var(--ink)]",
  line: "bg-white text-[var(--ink)]",
  ghost: "bg-transparent text-[var(--ink)] border-transparent shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-[16px] py-[8px] gap-[8px]",
  md: "px-[20px] py-[10px] gap-[8px]",
  lg: "px-[24px] py-[12px] gap-[12px]",
};

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const { children, className = "" } = props;

  const shadowClass = variant === "ghost" ? "" : "btn-shadow";

  const baseClasses =
    "inline-flex items-center no-underline cursor-pointer select-none " +
    "font-['Hanken_Grotesk'] font-extrabold text-[18px] " +
    "border-[3px] border-solid border-[var(--stroke)] rounded-full " +
    "transition-[transform,box-shadow] duration-[.12s] ease-in " +
    "hover:-translate-x-[2px] hover:-translate-y-[2px] " +
    "active:translate-x-[2px] active:translate-y-[2px] " +
    shadowClass + " " +
    variantStyles[variant] + " " +
    sizeStyles[size] + " " +
    className;

  if (props.as === "a") {
    const linkProps = props as ButtonAsLink;
    const linkRest: Record<string, unknown> = {};
    for (const k in linkProps) {
      if (k !== "as" && k !== "variant" && k !== "size" && k !== "className") {
        linkRest[k] = (linkProps as unknown as Record<string, unknown>)[k];
      }
    }
    return (
      <a className={baseClasses.trim()} {...linkRest}>
        {children}
      </a>
    );
  }

  const btnProps = props as ButtonAsButton;
  const btnRest: Record<string, unknown> = {};
  for (const k in btnProps) {
    if (k !== "as" && k !== "variant" && k !== "size" && k !== "className") {
      btnRest[k] = (btnProps as unknown as Record<string, unknown>)[k];
    }
  }
  return (
    <button className={baseClasses.trim()} {...btnRest}>
      {children}
    </button>
  );
}
