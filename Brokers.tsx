import { Linkedin, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonStyles } from "@/components/ui/Button";
import { brokers } from "@/data/brokers";
import { whatsappLink } from "@/lib/utils";

export function Brokers() {
  return (
    <section id="corretores" className="section scroll-mt-24 bg-mist">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Nossos consultores"
            title="Especialistas que caminham com você"
            description="Profissionais credenciados, com profundo conhecimento de mercado e atendimento personalizado."
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {brokers.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.1}>
              <article className="group overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-hover">
                <div className="relative aspect-[4/5] overflow-hidden bg-mist-dark">
                  <SafeImage
                    src={b.photo}
                    alt={`Retrato de ${b.name}, consultor imobiliário`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-top transition-transform duration-[900ms] group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-ink">{b.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-blue">{b.specialty}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">{b.creci}</p>

                  <div className="mt-5 flex items-center gap-3">
                    <a
                      href={whatsappLink(`Olá, ${b.name.split(" ")[0]}! Gostaria de conversar sobre imóveis.`, b.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonStyles({ size: "sm", className: "flex-1" })}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      <span className="relative">WhatsApp</span>
                    </a>
                    <a
                      href={b.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn de ${b.name}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-all hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue"
                    >
                      <Linkedin className="h-5 w-5" aria-hidden />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
