"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: string[];
  title: string;
}

export function Gallery({ images, title }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = images.length;

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, next, prev]);

  return (
    <>
      <div className="relative h-[300px] overflow-hidden rounded-3xl sm:h-[420px] md:h-[540px]">
        <div className="grid h-full gap-2 md:grid-cols-4 md:grid-rows-2">
          {images.slice(0, 5).map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => openAt(i)}
              aria-label={`Abrir foto ${i + 1} de ${total}`}
              className={cn(
                "group relative overflow-hidden bg-mist",
                i === 0 ? "md:col-span-2 md:row-span-2" : "hidden md:block",
              )}
            >
              <SafeImage
                src={src}
                alt={`${title} — foto ${i + 1}`}
                fill
                priority={i === 0}
                sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "25vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => openAt(0)}
          className="absolute bottom-4 right-4 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink shadow-lg transition-all hover:-translate-y-0.5 hover:bg-mist"
        >
          <Images className="h-4 w-4" aria-hidden />
          Ver todas as {total} fotos
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Galeria de fotos: ${title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-black/95"
          >
            <div className="flex items-center justify-between px-5 py-4 text-white">
              <p className="text-sm font-medium" aria-live="polite">
                {index + 1} / {total}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar galeria"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>

            <div className="relative flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 mx-4 sm:mx-20"
                >
                  <SafeImage
                    src={images[index]}
                    alt={`${title} — foto ${index + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={prev}
                aria-label="Foto anterior"
                className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-5"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Próxima foto"
                className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-5"
              >
                <ChevronRight className="h-6 w-6" aria-hidden />
              </button>
            </div>

            <div className="flex justify-center gap-2 overflow-x-auto px-5 py-4">
              {images.map((src, i) => (
                <button
                  key={`${src}-thumb-${i}`}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ir para foto ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition-all",
                    i === index ? "ring-brand-red" : "opacity-60 ring-transparent hover:opacity-100",
                  )}
                >
                  <SafeImage src={src} alt="" fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
