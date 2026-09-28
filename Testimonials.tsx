"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
};

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const total = testimonials.length;

  const go = useCallback(
    (d: number) => setState(([i]) => [(i + d + total) % total, d]),
    [total],
  );

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => go(1), 7000);
    return () => clearInterval(id);
  }, [paused, reduce, go]);

  const t = testimonials[index];

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Depoimentos de clientes"
      className="section relative overflow-hidden bg-white"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Depoimentos"
            title="Quem confia, recomenda"
            description="A satisfação dos nossos clientes é o nosso maior patrimônio."
            align="center"
          />
        </Reveal>

        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <Quote className="absolute -top-6 left-0 h-16 w-16 text-brand-red/15 sm:-left-8" aria-hidden />
          <div className="min-h-[340px] sm:min-h-[300px]" aria-live="polite">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.figure
                key={t.id}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
                className="cursor-grab rounded-3xl bg-mist p-8 text-center active:cursor-grabbing sm:p-12"
              >
                <div className="flex justify-center gap-1" role="img" aria-label={`${t.rating} de 5 estrelas`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-6 text-lg leading-relaxed text-ink sm:text-xl">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-8">
                  <p className="font-display text-base font-semibold text-ink">{t.name}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{t.context}</p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Depoimento anterior"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-all hover:border-brand-blue hover:text-brand-blue"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <div className="flex items-center gap-1" role="tablist" aria-label="Escolher depoimento">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Depoimento ${i + 1}`}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  className="flex h-11 w-7 items-center justify-center"
                >
                  <span
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === index ? "w-6 bg-brand-red" : "w-2 bg-mist-dark",
                    )}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próximo depoimento"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-all hover:border-brand-blue hover:text-brand-blue"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
