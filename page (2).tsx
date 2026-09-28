import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bath,
  BedDouble,
  BedSingle,
  Car,
  Check,
  ChevronRight,
  MapPin,
  MessageCircle,
  Ruler,
  type LucideIcon,
} from "lucide-react";
import { Gallery } from "@/components/property/Gallery";
import { ContactForm } from "@/components/property/ContactForm";
import { MortgageSimulator } from "@/components/property/MortgageSimulator";
import { MapPlaceholder } from "@/components/property/MapPlaceholder";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { buttonStyles } from "@/components/ui/Button";
import { brokers } from "@/data/brokers";
import { SITE } from "@/lib/constants";
import { getAllProperties, getPropertyById, getRelatedProperties } from "@/lib/properties";
import { cn, formatArea, formatBRL, formatPrice, whatsappLink } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getAllProperties().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) return { title: "Imóvel não encontrado" };
  const title = `${property.title} — ${property.neighborhood}`;
  return {
    title,
    description: property.description.slice(0, 155),
    alternates: { canonical: `/imovel/${property.id}` },
    openGraph: {
      title,
      description: property.description.slice(0, 155),
      images: [{ url: property.images[0] }],
    },
  };
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) notFound();

  const index = getAllProperties().findIndex((p) => p.id === property.id);
  const broker = brokers[index % brokers.length];
  const related = getRelatedProperties(property, 3);

  const specs: { label: string; value: string; Icon: LucideIcon }[] = [
    { label: "Quartos", value: String(property.bedrooms), Icon: BedDouble },
    { label: "Suítes", value: String(property.suites), Icon: BedSingle },
    { label: "Banheiros", value: String(property.bathrooms), Icon: Bath },
    { label: "Vagas", value: String(property.parking), Icon: Car },
    { label: "Área", value: formatArea(property.area), Icon: Ruler },
  ];

  const details: [string, string][] = [
    ["Referência", property.id.toUpperCase()],
    ["Tipo", property.type],
    ["Finalidade", property.purpose === "venda" ? "Venda" : "Aluguel"],
    ["Bairro", property.neighborhood],
    ["Ano de construção", String(property.yearBuilt)],
    ...(property.condoFee ? ([["Condomínio", `${formatBRL(property.condoFee)}/mês`]] as [string, string][]) : []),
    ...(property.iptu ? ([["IPTU", `${formatBRL(property.iptu)}/ano`]] as [string, string][]) : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${SITE.url}/imovel/${property.id}`,
    image: property.images,
    offers: { "@type": "Offer", price: property.price, priceCurrency: "BRL" },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: "Rio de Janeiro",
      addressRegion: "RJ",
      addressCountry: "BR",
    },
  };

  return (
    <div className="bg-white pb-24 pt-28 sm:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-page">
        <nav aria-label="Você está em" className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
          <Link href="/" className="transition-colors hover:text-brand-blue">
            Início
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden />
          <Link href="/imoveis" className="transition-colors hover:text-brand-blue">
            Imóveis
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden />
          <span aria-current="page" className="line-clamp-1 text-ink">
            {property.title}
          </span>
        </nav>

        <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {property.badge && (
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold text-white",
                    property.badge === "Novo" ? "bg-brand-blue" : "bg-brand-red",
                  )}
                >
                  {property.badge}
                </span>
              )}
              <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-ink-soft">
                {property.type} · {property.purpose === "venda" ? "Venda" : "Aluguel"}
              </span>
              <span className="text-xs text-ink-muted">Cód. {property.id.toUpperCase()}</span>
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {property.title}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-ink-soft">
              <MapPin className="h-5 w-5 text-brand-red" aria-hidden />
              {property.address}
            </p>
          </div>
          <p className="font-display text-4xl font-semibold text-brand-blue sm:text-5xl">
            {formatPrice(property.price, property.purpose)}
          </p>
        </div>

        <div className="mt-8">
          <Gallery images={property.images} title={property.title} />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-14">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {specs.map(({ label, value, Icon }) => (
                <li key={label} className="flex flex-col items-center rounded-2xl bg-mist px-3 py-5 text-center">
                  <Icon className="h-6 w-6 text-brand-blue" aria-hidden />
                  <p className="mt-2 font-display text-lg font-semibold text-ink">{value}</p>
                  <p className="text-xs text-ink-muted">{label}</p>
                </li>
              ))}
            </ul>

            <Reveal>
              <h2 className="text-2xl font-semibold text-ink">Sobre o imóvel</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">{property.description}</p>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-semibold text-ink">Informações completas</h2>
              <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {details.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-mist-dark py-3.5 text-sm">
                    <dt className="text-ink-muted">{label}</dt>
                    <dd className="text-right font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-semibold text-ink">Características</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-ink-soft">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue">
                      <Check className="h-4 w-4" aria-hidden />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="mb-6 text-2xl font-semibold text-ink">Localização</h2>
              <MapPlaceholder address={property.address} neighborhood={property.neighborhood} />
            </Reveal>

            {property.purpose === "venda" && (
              <Reveal>
                <h2 className="text-2xl font-semibold text-ink">Simulador de financiamento</h2>
                <p className="mb-6 mt-2 text-sm text-ink-soft">
                  Ajuste entrada, prazo e taxa para estimar a parcela mensal.
                </p>
                <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink/5 sm:p-8">
                  <MortgageSimulator price={property.price} title={property.title} />
                </div>
              </Reveal>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Contato">
            <div className="rounded-3xl bg-white p-6 shadow-card-hover ring-1 ring-ink/5 sm:p-7">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-mist">
                  <SafeImage
                    src={broker.photo}
                    alt={`Retrato de ${broker.name}`}
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Consultor responsável
                  </p>
                  <p className="font-display text-lg font-semibold text-ink">{broker.name}</p>
                  <p className="text-sm text-brand-blue">{broker.specialty}</p>
                </div>
              </div>

              <a
                href={whatsappLink(
                  `Olá, ${broker.name.split(" ")[0]}! Tenho interesse no imóvel ${property.id.toUpperCase()} (${property.title}).`,
                  broker.whatsapp,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "secondary", className: "mt-6 w-full" })}
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                <span className="relative">Chamar no WhatsApp</span>
              </a>

              <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-ink-muted">
                <span className="h-px flex-1 bg-mist-dark" />
                ou envie uma mensagem
                <span className="h-px flex-1 bg-mist-dark" />
              </div>

              <ContactForm propertyTitle={property.title} propertyId={property.id} />
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-24" aria-labelledby="similares">
            <Reveal>
              <h2 id="similares" className="text-2xl font-semibold text-ink sm:text-3xl">
                Imóveis semelhantes
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.1}>
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
