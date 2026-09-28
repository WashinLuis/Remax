"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/utils";

export function WhatsAppFloat() {
  const pathname = usePathname();
  const isProperty = pathname.startsWith("/imovel/");
  const code = isProperty ? pathname.split("/").filter(Boolean).pop()?.toUpperCase() : undefined;
  const message = code
    ? `Olá! Tenho interesse no imóvel ${code}. Podemos conversar?`
    : "Olá! Gostaria de mais informações sobre os imóveis da RE/MAX Inside.";

  return (
    <motion.a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1FA855] text-white shadow-[0_12px_32px_-8px_rgba(31,168,85,.7)] sm:bottom-8 sm:right-8"
    >
      <span
        aria-hidden
        className="absolute inset-0 animate-pulse-ring rounded-full bg-[#1FA855]"
      />
      <MessageCircle className="relative h-7 w-7" aria-hidden />
    </motion.a>
  );
}
