import Link from "next/link";
import { Eye, HeartHandshake, ShieldCheck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonStyles } from "@/components/ui/Button";
import { TEAM_IMAGE } from "@/data/images";
import { whatsappLink } from "@/lib/utils";

const pillars: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Relacionamento", text: "Entendemos seus objetivos antes de apresentar qualquer imóvel.", Icon: HeartHandshake },
  { title: "Transparência", text: "Informação clara em cada etapa, do primeiro contato à escritura.", Icon: Eye },
  { title: "Excelência", text: "Padrão global RE/MAX aliado ao conhecimento profundo do mercado carioca.", Icon: ShieldCheck },
];

export function About() {
  return (
    <section id="sobre" className="section scroll-mt-24 bg-white">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHeading eyebrow="Sobre a RE/MAX Inside" title="Confiança em cada negociação" />
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Na RE/MAX Inside Imóveis acreditamos que cada negociação começa com confiança. Atuamos de forma
            consultiva, conectando pessoas aos imóveis certos através de relacionamento, transparência e
            excelência.
          </p>

          <ul className="mt-8 space-y-5">
            {pillars.map(({ title, text, Icon }) => (
              <li key={title} className="flex gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-blue-soft text-brand-blue">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/imoveis" className={buttonStyles({ size: "lg" })}>
              <span className="relative">Conheça nossos imóveis</span>
            </Link>
            <a
              href={whatsappLink("Olá! Gostaria de falar com um consultor da RE/MAX Inside.")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              <span className="relative">Falar com um consultor</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="absolute -bottom-5 -right-5 hidden h-full w-full rounded-[2rem] border-2 border-brand-red/25 sm:block" aria-hidden />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-mist shadow-card-hover sm:aspect-[5/6]">
            <SafeImage
              src={TEAM_IMAGE}
              alt="Equipe de consultores da RE/MAX Inside Imóveis reunida em escritório"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -left-4 bottom-8 rounded-2xl bg-white p-5 shadow-card-hover sm:-left-8">
            <p className="font-display text-3xl font-semibold text-brand-blue">25+ anos</p>
            <p className="text-sm text-ink-soft">conectando pessoas a lares</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
