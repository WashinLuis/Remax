import { Award, Building2, Smile, Users, type LucideIcon } from "lucide-react";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

const stats: { value: number; suffix: string; label: string; Icon: LucideIcon }[] = [
  { value: 25, suffix: "+", label: "anos de experiência", Icon: Award },
  { value: 350, suffix: "+", label: "imóveis ativos", Icon: Building2 },
  { value: 1200, suffix: "", label: "clientes atendidos", Icon: Users },
  { value: 98, suffix: "%", label: "de satisfação", Icon: Smile },
];

export function Stats() {
  return (
    <section id="estatisticas" aria-label="Números da RE/MAX Inside" className="scroll-mt-24 border-b border-mist-dark bg-white">
      <div className="container-page grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4">
        {stats.map(({ value, suffix, label, Icon }, i) => (
          <Reveal key={label} delay={i * 0.08} className="flex flex-col items-center px-4 text-center lg:border-r lg:border-mist-dark lg:last:border-r-0">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue-soft text-brand-blue">
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <p className="font-display text-4xl font-semibold text-brand-blue sm:text-5xl">
              <Counter to={value} suffix={suffix} />
            </p>
            <p className="mt-2 text-sm font-medium text-ink-soft">{label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
