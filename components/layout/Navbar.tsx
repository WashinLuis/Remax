"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { buttonStyles } from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn, whatsappLink } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !isHome || open;

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "bg-white/90 py-3 shadow-[0_1px_0_rgba(11,15,26,.06)] backdrop-blur-xl"
            : "bg-transparent py-5",
        )}
      >
        <div className="container-page flex items-center justify-between gap-6">
          <Link href="/" aria-label="RE/MAX Inside Imóveis — página inicial" className="rounded-md">
            <Logo variant={solid ? "dark" : "light"} />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  solid ? "text-ink-soft hover:text-brand-blue" : "text-white/90 hover:text-white",
                  isActive(link.href) && (solid ? "text-brand-blue" : "text-white"),
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className={cn(
                      "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full",
                      solid ? "bg-brand-red" : "bg-white",
                    )}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${SITE.phone.replace(/\D/g, "")}`}
              className={cn(
                "hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors xl:inline-flex",
                solid ? "text-ink-soft hover:text-brand-blue" : "text-white/90 hover:text-white",
              )}
            >
              <Phone className="h-4 w-4" aria-hidden />
              {SITE.phone}
            </a>
            <a
              href={whatsappLink("Olá! Gostaria de uma avaliação gratuita do meu imóvel.")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ size: "sm", className: "hidden sm:inline-flex" })}
            >
              <span className="relative">Avaliar imóvel</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
                solid ? "text-ink hover:bg-mist" : "text-white hover:bg-white/15",
              )}
            >
              {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-white px-6 pb-10 pt-28 lg:hidden"
          >
            <nav aria-label="Menu mobile" className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-mist-dark py-5 font-display text-2xl font-medium text-ink"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={whatsappLink("Olá! Gostaria de uma avaliação gratuita do meu imóvel.")}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ size: "lg", className: "w-full" })}
              >
                <span className="relative">Solicitar avaliação gratuita</span>
              </a>
              <a
                href={`tel:${SITE.phone.replace(/\D/g, "")}`}
                className={buttonStyles({ variant: "outline", size: "lg", className: "w-full" })}
              >
                <Phone className="h-4 w-4" aria-hidden />
                <span className="relative">{SITE.phone}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
