import type { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white" | "glass";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex select-none touch-manipulation cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-tight transition-all duration-300 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 before:pointer-events-none before:absolute before:inset-y-0 before:-left-full before:w-1/2 before:-skew-x-12 before:bg-white/25 before:transition-transform before:duration-700 hover:before:translate-x-[400%]";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-red text-white shadow-[0_10px_28px_-10px_rgba(225,29,46,.65)] hover:-translate-y-0.5 hover:bg-brand-red-dark hover:shadow-[0_16px_36px_-12px_rgba(225,29,46,.75)]",
  secondary:
    "bg-brand-blue text-white shadow-[0_10px_28px_-10px_rgba(0,61,165,.6)] hover:-translate-y-0.5 hover:bg-brand-blue-dark",
  outline:
    "border border-ink/15 bg-white text-ink hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue",
  ghost: "text-ink hover:bg-mist",
  white:
    "bg-white text-brand-red shadow-[0_14px_36px_-14px_rgba(0,0,0,.45)] hover:-translate-y-0.5 hover:bg-mist",
  glass: "border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-5 text-sm",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-base",
};

interface StyleOptions {
  variant?: Variant;
  size?: Size;
  className?: string;
}

/** Use com <Link> ou <a> para botões que navegam. */
export function buttonStyles({ variant = "primary", size = "md", className }: StyleOptions = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, StyleOptions {
  loading?: boolean;
}

export function Button({
  variant,
  size,
  loading,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, className })}
      {...rest}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
