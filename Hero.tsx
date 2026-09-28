"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { SearchBar } from "./SearchBar";
import { HERO_IMAGE } from "@/data/images";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      {/* Para usar vídeo: substitua este bloco por <video autoPlay muted loop playsInline poster={HERO_IMAGE}> */}
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease }}
      >
        <SafeImage
          src={HERO_IMAGE}
          alt="Casa de luxo com piscina em condomínio de alto padrão"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/35 to-black/75" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-brand-blue-dark/50 via-transparent to-transparent" />

      <div className="container-page pb-28 pt-36">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-red" aria-hidden />
          RE/MAX Inside Imóveis
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-7xl"
        >
          Encontre o imóvel perfeito para viver ou investir.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl"
        >
          Especialistas em imóveis exclusivos no Rio de Janeiro.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
          className="mt-12"
        >
          <SearchBar />
        </motion.div>
      </div>

      <a
        href="#estatisticas"
        aria-label="Rolar para o conteúdo"
        className="absolute bottom-6 left-1/2 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/30 text-white/90 transition-colors hover:bg-white/15 md:inline-flex"
      >
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-5 w-5" aria-hidden />
        </motion.span>
      </a>
    </section>
  );
}
