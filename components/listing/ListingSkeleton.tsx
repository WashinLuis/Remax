import { PropertyCardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export function ListingSkeleton() {
  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-[300px_1fr] lg:py-16" aria-busy="true">
      <aside className="hidden lg:block">
        <div className="space-y-6 rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink/5">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </aside>
      <div>
        <Skeleton className="mb-8 h-8 w-48" />
        <div className="grid gap-6 sm:grid-cols-[repeat(auto-fill,minmax(310px,1fr))]">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
