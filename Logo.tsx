import { cn } from "@/lib/utils";

/** Wordmark original. Substitua pelo logotipo oficial da franquia em produção. */
export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const light = variant === "light";
  return (
    <span className="inline-flex flex-col leading-none" aria-label="RE/MAX Inside Imóveis">
      <span className="font-display text-[22px] font-bold tracking-tight">
        <span className={light ? "text-white" : "text-brand-blue"}>RE</span>
        <span className="text-brand-red">/</span>
        <span className={light ? "text-white" : "text-brand-blue"}>MAX</span>
      </span>
      <span
        className={cn(
          "mt-1 text-[10px] font-semibold uppercase tracking-[0.34em]",
          light ? "text-white/80" : "text-ink-muted",
        )}
      >
        Inside Imóveis
      </span>
    </span>
  );
}
