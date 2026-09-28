import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-mist pt-24">
      <div className="container-page text-center">
        <p className="font-display text-7xl font-semibold text-brand-red sm:text-8xl">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-ink">Página não encontrada</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          O imóvel ou a página que você procura pode ter sido vendido ou movido.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/imoveis" className={buttonStyles({ size: "lg" })}>
            <span className="relative">Ver imóveis disponíveis</span>
          </Link>
          <Link href="/" className={buttonStyles({ variant: "outline", size: "lg" })}>
            <span className="relative">Voltar ao início</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
