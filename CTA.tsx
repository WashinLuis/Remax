import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/utils";

export function CTA() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-red py-20 sm:py-28">
      <div className="absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-white/10" aria-hidden />
      <div className="absolute -bottom-32 right-0 -z-10 h-96 w-96 rounded-full bg-brand-red-dark/60" aria-hidden />
      <div className="absolute right-1/4 top-10 -z-10 h-40 w-40 rounded-full border border-white/20" aria-hidden />

      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Quer vender seu imóvel pelo melhor valor?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/90">
            Nossos especialistas fazem uma avaliação técnica, sem compromisso, com base no mercado real da sua região.
          </p>
          <a
            href={whatsappLink("Olá! Quero solicitar uma avaliação gratuita do meu imóvel.")}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ variant: "white", size: "lg", className: "mt-10" })}
          >
            <span className="relative inline-flex items-center gap-2">
              Solicitar avaliação gratuita
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
