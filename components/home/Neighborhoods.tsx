import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { neighborhoods } from "@/data/neighborhoods";

export function Neighborhoods() {
  return (
    <section id="bairros" className="section scroll-mt-24 bg-white">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Onde morar"
            title="Explore os melhores bairros do Rio"
            description="Da orla da Zona Sul aos condomínios da Barra e do Recreio: conheça a região que combina com o seu estilo de vida."
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {neighborhoods.map((n, i) => (
            <Reveal key={n.name} delay={(i % 3) * 0.08}>
              <Link
                href={`/imoveis?bairro=${encodeURIComponent(n.name)}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-mist shadow-card"
                aria-label={`${n.name}: ${n.count} imóveis`}
              >
                <SafeImage
                  src={n.image}
                  alt={`Vista do bairro ${n.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <p className="inline-flex rounded-full bg-brand-red px-3 py-1 text-xs font-semibold text-white">
                    {n.count} imóveis
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">{n.name}</h3>
                  <p className="mt-1 hidden max-w-xs text-sm text-white/80 sm:block">{n.blurb}</p>
                </div>
                <span className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 max-md:opacity-100 sm:translate-x-2">
                  <ArrowUpRight className="h-5 w-5" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
