import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SITE } from "./constants";
import type { Purpose } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function formatBRL(value: number) {
  return brl.format(value).replace(/\u00a0/g, " ");
}

export function formatPrice(value: number, purpose: Purpose) {
  return purpose === "aluguel" ? `${formatBRL(value)}/mês` : formatBRL(value);
}

export function formatArea(m2: number) {
  return `${m2.toLocaleString("pt-BR")} m²`;
}

export function whatsappLink(message?: string, phone: string = SITE.whatsapp) {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Parcela mensal pela Tabela Price. Taxa anual convertida para taxa mensal equivalente. */
export function monthlyPayment(principal: number, annualRatePct: number, years: number) {
  const n = years * 12;
  const i = Math.pow(1 + annualRatePct / 100, 1 / 12) - 1;
  if (n <= 0) return 0;
  if (i === 0) return principal / n;
  return (principal * i) / (1 - Math.pow(1 + i, -n));
}
