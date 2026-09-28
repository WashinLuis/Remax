import { ExternalLink, MapPin } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";

export function MapPlaceholder({ address, neighborhood }: { address: string; neighborhood: string }) {
  const query = encodeURIComponent(`${address}, Rio de Janeiro, RJ`);
  return (
    <div
      className="relative flex h-72 items-center justify-center overflow-hidden rounded-3xl bg-brand-blue-soft ring-1 ring-ink/5 sm:h-80"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,61,165,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,61,165,.08) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }}
      role="img"
      aria-label={`Localização aproximada: ${neighborhood}, Rio de Janeiro`}
    >
      <div className="absolute -left-10 top-10 h-40 w-[130%] -rotate-6 bg-white/70" aria-hidden />
      <div className="absolute -right-10 bottom-14 h-3 w-[120%] rotate-3 bg-white/80" aria-hidden />

      <div className="relative flex flex-col items-center text-center">
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white shadow-lg">
          <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-red" />
          <MapPin className="relative h-7 w-7" aria-hidden />
        </span>
        <p className="mt-4 font-display text-lg font-semibold text-ink">{neighborhood}</p>
        <p className="text-sm text-ink-soft">Rio de Janeiro, RJ</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles({ variant: "white", size: "sm", className: "mt-5 !text-brand-blue" })}
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          <span className="relative">Abrir no Google Maps</span>
        </a>
      </div>
      <span className="absolute bottom-3 left-4 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-ink-muted">
        Mapa interativo em breve
      </span>
    </div>
  );
}
