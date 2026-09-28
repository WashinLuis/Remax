"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const btn =
    "inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-semibold transition-all";

  return (
    <nav aria-label="Paginação" className="mt-12 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Página anterior"
        className={cn(btn, "border border-mist-dark bg-white text-ink hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-40")}
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-label={`Página ${p}`}
          aria-current={p === page ? "page" : undefined}
          className={cn(
            btn,
            p === page
              ? "bg-brand-red text-white shadow-[0_8px_20px_-8px_rgba(225,29,46,.7)]"
              : "text-ink-soft hover:bg-mist hover:text-brand-blue",
          )}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Próxima página"
        className={cn(btn, "border border-mist-dark bg-white text-ink hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-40")}
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>
    </nav>
  );
}
