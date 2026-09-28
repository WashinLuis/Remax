"use client";

import { Building2, MapPin, RotateCcw, Wallet } from "lucide-react";
import { SelectField } from "@/components/ui/SelectField";
import { NEIGHBORHOOD_NAMES, PRICE_RANGES, PROPERTY_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ListingFilters } from "@/lib/properties";
import type { Purpose } from "@/types";

export type FilterKey = "finalidade" | "bairro" | "tipo" | "preco" | "quartos" | "ordem" | "pagina";
export type FilterPatch = Partial<Record<FilterKey, string | null>>;

interface FiltersProps {
  values: ListingFilters;
  onChange: (patch: FilterPatch) => void;
  onReset: () => void;
  idPrefix: string;
}

const PURPOSES: { value: Purpose; label: string }[] = [
  { value: "venda", label: "Comprar" },
  { value: "aluguel", label: "Alugar" },
];

const BEDROOMS = [
  { value: 0, label: "Todos" },
  { value: 1, label: "1+" },
  { value: 2, label: "2+" },
  { value: 3, label: "3+" },
  { value: 4, label: "4+" },
];

export function Filters({ values, onChange, onReset, idPrefix }: FiltersProps) {
  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Finalidade
        </legend>
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-mist p-1" role="radiogroup" aria-label="Finalidade">
          {PURPOSES.map((p) => {
            const active = values.purpose === p.value;
            return (
              <button
                key={p.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange({ finalidade: p.value, preco: null })}
                className={cn(
                  "h-11 rounded-lg text-sm font-semibold transition-all",
                  active ? "bg-brand-blue text-white shadow-md" : "text-ink-soft hover:text-brand-blue",
                )}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <SelectField
        id={`${idPrefix}-bairro`}
        label="Bairro"
        value={values.neighborhood}
        onChange={(v) => onChange({ bairro: v || null })}
        placeholder="Todos os bairros"
        icon={<MapPin className="h-4 w-4" />}
        options={NEIGHBORHOOD_NAMES.map((n) => ({ value: n, label: n }))}
      />
      <SelectField
        id={`${idPrefix}-tipo`}
        label="Tipo de imóvel"
        value={values.type}
        onChange={(v) => onChange({ tipo: v || null })}
        placeholder="Todos os tipos"
        icon={<Building2 className="h-4 w-4" />}
        options={PROPERTY_TYPES.map((t) => ({ value: t, label: t }))}
      />
      <SelectField
        id={`${idPrefix}-preco`}
        label="Faixa de preço"
        value={values.price}
        onChange={(v) => onChange({ preco: v || null })}
        placeholder="Qualquer valor"
        icon={<Wallet className="h-4 w-4" />}
        options={PRICE_RANGES[values.purpose].map((r) => ({ value: r.id, label: r.label }))}
      />

      <fieldset>
        <legend className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Quartos
        </legend>
        <div className="grid grid-cols-5 gap-1.5" role="radiogroup" aria-label="Quartos">
          {BEDROOMS.map((b) => {
            const active = values.bedrooms === b.value;
            return (
              <button
                key={b.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange({ quartos: b.value ? String(b.value) : null })}
                className={cn(
                  "h-11 rounded-lg border text-sm font-semibold transition-all",
                  active
                    ? "border-brand-blue bg-brand-blue text-white"
                    : "border-mist-dark bg-white text-ink-soft hover:border-brand-blue hover:text-brand-blue",
                )}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-ink-soft transition-colors hover:bg-mist hover:text-brand-red"
      >
        <RotateCcw className="h-4 w-4" aria-hidden />
        Limpar filtros
      </button>
    </div>
  );
}
