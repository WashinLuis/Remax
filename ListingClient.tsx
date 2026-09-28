"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX, SlidersHorizontal, X } from "lucide-react";
import { Filters, type FilterPatch } from "./Filters";
import { Pagination } from "./Pagination";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/SelectField";
import { PropertyCardSkeleton } from "@/components/ui/Skeleton";
import { PAGE_SIZE, SORT_OPTIONS } from "@/lib/constants";
import { getAllProperties, filterProperties, parseFilters, sortProperties } from "@/lib/properties";

const GRID = "grid gap-6 sm:grid-cols-[repeat(auto-fill,minmax(310px,1fr))]";

export function ListingClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

  const [loading, setLoading] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const first = useRef(true);
  const paramsKey = searchParams.toString();

  // Skeleton curto ao trocar filtros (simula carregamento de API).
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, [paramsKey]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const update = useCallback(
    (patch: FilterPatch) => {
      const p = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (value) p.set(key, value);
        else p.delete(key);
      }
      if (!("pagina" in patch)) p.delete("pagina");
      const qs = p.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const reset = useCallback(() => {
    router.replace(`${pathname}?finalidade=${filters.purpose}`, { scroll: false });
  }, [router, pathname, filters.purpose]);

  const results = useMemo(
    () => sortProperties(filterProperties(getAllProperties(), filters), filters.sort),
    [filters],
  );
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(filters.page, totalPages);
  const items = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changePage(next: number) {
    update({ pagina: next > 1 ? String(next) : null });
    window.scrollTo({ top: 260, behavior: "smooth" });
  }

  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-[300px_1fr] lg:py-16">
      <aside className="hidden lg:block" aria-label="Filtros">
        <div className="sticky top-28 rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink/5">
          <h2 className="mb-5 text-lg font-semibold text-ink">Filtrar imóveis</h2>
          <Filters values={filters} onChange={update} onReset={reset} idPrefix="side" />
        </div>
      </aside>

      <div>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <p className="text-sm text-ink-soft" aria-live="polite">
            <strong className="font-display text-xl font-semibold text-ink">{results.length}</strong>{" "}
            {results.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
          </p>
          <div className="flex items-end gap-3">
            <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setDrawer(true)}>
              <SlidersHorizontal className="h-4 w-4" aria-hidden />
              Filtros
            </Button>
            <SelectField
              id="sort"
              label="Ordenar por"
              value={filters.sort}
              onChange={(v) => update({ ordem: v === "relevancia" ? null : v })}
              options={SORT_OPTIONS}
              hideLabel
              className="w-48"
            />
          </div>
        </div>

        {loading ? (
          <div className={GRID} aria-busy="true">
            {Array.from({ length: Math.min(PAGE_SIZE, Math.max(items.length, 3)) }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl bg-mist px-6 py-20 text-center">
            <SearchX className="h-12 w-12 text-brand-blue/50" aria-hidden />
            <h2 className="mt-5 text-xl font-semibold text-ink">Nenhum imóvel encontrado</h2>
            <p className="mt-2 max-w-sm text-sm text-ink-soft">
              Ajuste os filtros ou limpe a busca para ver mais opções disponíveis.
            </p>
            <Button className="mt-6" onClick={reset}>
              Limpar filtros
            </Button>
          </div>
        ) : (
          <>
            <div className={GRID}>
              {items.map((property, i) => (
                <Reveal key={property.id} delay={i * 0.05} y={16}>
                  <PropertyCard property={property} />
                </Reveal>
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onChange={changePage} />
          </>
        )}
      </div>

      <AnimatePresence>
        {drawer && (
          <div className="fixed inset-0 z-[55] lg:hidden" role="dialog" aria-modal="true" aria-label="Filtros">
            <motion.button
              type="button"
              aria-label="Fechar filtros"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
              className="absolute inset-0 bg-black/50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white"
            >
              <div className="flex items-center justify-between border-b border-mist-dark px-6 py-4">
                <h2 className="text-lg font-semibold text-ink">Filtrar imóveis</h2>
                <button
                  type="button"
                  onClick={() => setDrawer(false)}
                  aria-label="Fechar filtros"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-mist"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <Filters values={filters} onChange={update} onReset={reset} idPrefix="drawer" />
              </div>
              <div className="border-t border-mist-dark p-5">
                <Button size="lg" className="w-full" onClick={() => setDrawer(false)}>
                  Ver {results.length} {results.length === 1 ? "imóvel" : "imóveis"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
