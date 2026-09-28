import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden rounded-xl bg-mist-dark/70", className)}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Carregando imóvel"
      className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink/5"
    >
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="space-y-4 p-5">
        <Skeleton className="h-7 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-11 w-full rounded-full" />
      </div>
    </div>
  );
}
