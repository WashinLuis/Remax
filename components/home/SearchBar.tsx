"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, Search, Wallet } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/SelectField";
import { NEIGHBORHOOD_NAMES, PRICE_RANGES, PROPERTY_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Purpose } from "@/types";

const PURPOSES: { value: Purpose; label: string }[] = [
  { value: "venda", label: "Comprar" },
  { value: "aluguel", label: "Alugar" },
];

export function SearchBar() {
  const router = useRouter();
  const [purpose, setPurpose] = useState<Purpose>("venda");
  const [neighborhood, setNeighborhood] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  function changePurpose(next: Purpose) {
    setPurpose(next);
    setPrice("");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ finalidade: purpose });
    if (neighborhood) params.set("bairro", neighborhood);
    if (type) params.set("tipo", type);
    if (price) params.set("preco", price);
    router.push(`/imoveis?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Busca de imóveis"
      className="w-full max-w-5xl"
    >
      <div
        role="radiogroup"
        aria-label="Finalidade"
        className="relative inline-flex rounded-t-2xl bg-white/95 p-1.5 pb-0 backdrop-blur"
      >
        {PURPOSES.map((p) => {
          const active = purpose === p.value;
          return (
            <button
              key={p.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => changePurpose(p.value)}
              className={cn(
                "relative h-11 min-w-28 rounded-xl px-6 text-sm font-semibold transition-colors",
                active ? "text-white" : "text-ink-soft hover:text-brand-blue",
              )}
            >
              {active && (
                <motion.span
                  layoutId="purpose-pill"
                  className="absolute inset-0 rounded-xl bg-brand-blue"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{p.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 rounded-3xl rounded-tl-none bg-white/95 p-4 shadow-glass backdrop-blur sm:p-5 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
        <SelectField
          id="hs-bairro"
          label="Bairro"
          value={neighborhood}
          onChange={setNeighborhood}
          placeholder="Todos os bairros"
          icon={<MapPin className="h-4 w-4" />}
          options={NEIGHBORHOOD_NAMES.map((n) => ({ value: n, label: n }))}
        />
        <SelectField
          id="hs-tipo"
          label="Tipo de imóvel"
          value={type}
          onChange={setType}
          placeholder="Todos os tipos"
          icon={<Building2 className="h-4 w-4" />}
          options={PROPERTY_TYPES.map((t) => ({ value: t, label: t }))}
        />
        <SelectField
          id="hs-preco"
          label="Faixa de preço"
          value={price}
          onChange={setPrice}
          placeholder="Qualquer valor"
          icon={<Wallet className="h-4 w-4" />}
          options={PRICE_RANGES[purpose].map((r) => ({ value: r.id, label: r.label }))}
        />
        <Button type="submit" size="md" className="h-12 w-full lg:w-auto lg:px-10">
          <Search className="h-4 w-4" aria-hidden />
          Buscar
        </Button>
      </div>
    </form>
  );
}
