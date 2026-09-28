"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bath, BedDouble, Heart, MapPin, Ruler, Sparkles, Star } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { buttonStyles } from "@/components/ui/Button";
import { cn, formatArea, formatPrice } from "@/lib/utils";
import type { Property } from "@/types";

export function PropertyCard({ property }: { property: Property }) {
  const [liked, setLiked] = useState(false);
  const href = `/imovel/${property.id}`;
  const BadgeIcon = property.badge === "Novo" ? Sparkles : Star;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <Link href={href} aria-label={`Ver detalhes: ${property.title}`} className="block h-full w-full">
          <SafeImage
            src={property.images[0]}
            alt={`${property.title} — ${property.neighborhood}`}
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
        </Link>

        {property.badge && (
          <span
            className={cn(
              "absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-lg",
              property.badge === "Novo" ? "bg-brand-blue" : "bg-brand-red",
            )}
          >
            <BadgeIcon className="h-3.5 w-3.5" aria-hidden />
            {property.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-pressed={liked}
          aria-label={liked ? "Remover dos favoritos" : "Salvar nos favoritos"}
          className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg backdrop-blur transition-transform hover:scale-105 active:scale-95"
        >
          <Heart
            className={cn("h-5 w-5 transition-colors", liked ? "fill-brand-red text-brand-red" : "text-ink")}
            aria-hidden
          />
        </button>

        <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {property.type} · {property.purpose === "venda" ? "Venda" : "Aluguel"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-display text-2xl font-semibold text-ink">
          {formatPrice(property.price, property.purpose)}
        </p>
        <h3 className="mt-1.5 line-clamp-1 text-base font-medium text-ink-soft">{property.title}</h3>
        <p className="mt-2 flex items-start gap-1.5 text-sm text-ink-muted">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden />
          <span className="line-clamp-1">{property.address}</span>
        </p>

        <ul className="mt-5 flex items-center gap-5 border-y border-mist-dark py-4 text-sm text-ink-soft">
          <li className="flex items-center gap-2" aria-label={`${property.bedrooms} quartos`}>
            <BedDouble className="h-4 w-4 text-brand-blue" aria-hidden />
            <span>{property.bedrooms}</span>
          </li>
          <li className="flex items-center gap-2" aria-label={`${property.bathrooms} banheiros`}>
            <Bath className="h-4 w-4 text-brand-blue" aria-hidden />
            <span>{property.bathrooms}</span>
          </li>
          <li className="flex items-center gap-2" aria-label={`${property.area} metros quadrados`}>
            <Ruler className="h-4 w-4 text-brand-blue" aria-hidden />
            <span>{formatArea(property.area)}</span>
          </li>
        </ul>

        <Link
          href={href}
          className={buttonStyles({
            variant: "outline",
            size: "sm",
            className:
              "mt-5 w-full group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white",
          })}
        >
          <span className="relative inline-flex items-center gap-2">
            Ver detalhes
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </span>
        </Link>
      </div>
    </motion.article>
  );
}
