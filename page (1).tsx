import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";
import { ListingClient } from "@/components/listing/ListingClient";
import { ListingSkeleton } from "@/components/listing/ListingSkeleton";

export const metadata: Metadata = {
  title: "Imóveis à venda e para alugar no Rio de Janeiro",
  description:
    "Explore apartamentos, coberturas e casas de alto padrão no Leblon, Ipanema, Barra da Tijuca, Botafogo, Recreio e Tijuca.",
  alternates: { canonical: "/imoveis" },
};

export default function ListingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-blue-dark pb-14 pt-36 text-white">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/5" aria-hidden />
        <div className="absolute bottom-0 right-1/3 h-40 w-40 rounded-full border border-white/10" aria-hidden />
        <div className="container-page relative">
          <nav aria-label="Você está em" className="flex items-center gap-1.5 text-sm text-white/70">
            <Link href="/" className="transition-colors hover:text-white">
              Início
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden />
            <span aria-current="page" className="text-white">
              Imóveis
            </span>
          </nav>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            Imóveis à venda e para alugar no Rio de Janeiro
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Use os filtros para encontrar o imóvel ideal para o seu momento.
          </p>
        </div>
      </section>

      <div className="bg-mist">
        <Suspense fallback={<ListingSkeleton />}>
          <ListingClient />
        </Suspense>
      </div>
    </>
  );
}
