import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS, NEIGHBORHOOD_NAMES, SITE } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

const socials = [
  { label: "WhatsApp", href: whatsappLink(), Icon: MessageCircle },
  { label: "Instagram", href: SITE.instagram, Icon: Instagram },
  { label: "LinkedIn", href: SITE.linkedin, Icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">
            Consultoria imobiliária de médio e alto padrão no Rio de Janeiro, com relacionamento, transparência e
            excelência em cada negociação.
          </p>
          <ul className="mt-6 flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-red hover:bg-brand-red"
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Rodapé — menu">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Menu</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Rodapé — bairros">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Bairros</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {NEIGHBORHOOD_NAMES.map((name) => (
              <li key={name}>
                <Link
                  href={`/imoveis?bairro=${encodeURIComponent(name)}`}
                  className="transition-colors hover:text-white"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Contato</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden />
              <span>{SITE.address}</span>
            </li>
            <li>
              <a
                href={`tel:${SITE.phone.replace(/\D/g, "")}`}
                className="flex gap-3 transition-colors hover:text-white"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 transition-colors hover:text-white"
              >
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden />
                WhatsApp {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex gap-3 transition-colors hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden />
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} RE/MAX Inside Imóveis. Todos os direitos reservados. {SITE.creci}.
          </p>
          <p>Cada escritório é independente e operado de forma independente.</p>
        </div>
      </div>
    </footer>
  );
}
