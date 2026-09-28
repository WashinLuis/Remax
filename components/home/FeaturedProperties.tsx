import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonStyles } from "@/components/ui/Button";
import { getFeaturedProperties } from "@/lib/properties";

export function FeaturedProperties() {
  const items = getFeaturedProperties(6);
  return (
    <section id="destaques" className="section scroll-mt-24 bg-mist">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Seleção exclusiva"
              title="Imóveis em destaque"
              description="Oportunidades cuidadosamente escolhidas por nossos consultores nos bairros mais desejados do Rio."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/imoveis" className={buttonStyles({ variant: "outline" })}>
              <span className="relative inline-flex items-center gap-2">
                Ver todos os imóveis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((property, i) => (
            <Reveal key={property.id} delay={(i % 3) * 0.1}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
