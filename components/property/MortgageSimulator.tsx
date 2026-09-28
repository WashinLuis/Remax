"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { formatBRL, monthlyPayment, whatsappLink } from "@/lib/utils";

export function MortgageSimulator({ price, title }: { price: number; title: string }) {
  const [downPct, setDownPct] = useState(30);
  const [years, setYears] = useState(30);
  const [rate, setRate] = useState(10.5);

  const { down, financed, payment, total } = useMemo(() => {
    const down = (price * downPct) / 100;
    const financed = price - down;
    const payment = monthlyPayment(financed, rate, years);
    return { down, financed, payment, total: payment * years * 12 };
  }, [price, downPct, years, rate]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-7">
        <SliderField
          id="sim-entrada"
          label="Entrada"
          valueLabel={`${downPct}% · ${formatBRL(down)}`}
          min={10}
          max={80}
          step={5}
          value={downPct}
          onChange={setDownPct}
        />
        <SliderField
          id="sim-prazo"
          label="Prazo"
          valueLabel={`${years} anos`}
          min={5}
          max={35}
          step={1}
          value={years}
          onChange={setYears}
        />
        <SliderField
          id="sim-taxa"
          label="Taxa de juros (a.a.)"
          valueLabel={`${rate.toFixed(2).replace(".", ",")}%`}
          min={6}
          max={16}
          step={0.25}
          value={rate}
          onChange={setRate}
        />
      </div>

      <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-brand-blue to-brand-blue-dark p-7 text-white shadow-card">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            <Calculator className="h-4 w-4" aria-hidden />
            Parcela estimada
          </p>
          <p className="mt-3 font-display text-4xl font-semibold sm:text-5xl" aria-live="polite">
            {formatBRL(Math.round(payment))}
            <span className="ml-1 text-base font-normal text-white/70">/mês</span>
          </p>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-t border-white/15 pt-3">
              <dt className="text-white/70">Valor financiado</dt>
              <dd className="font-semibold">{formatBRL(Math.round(financed))}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-white/15 pt-3">
              <dt className="text-white/70">Total pago ao final</dt>
              <dd className="font-semibold">{formatBRL(Math.round(total))}</dd>
            </div>
          </dl>
        </div>
        <div className="mt-7">
          <a
            href={whatsappLink(`Olá! Fiz uma simulação de financiamento para o imóvel "${title}" e gostaria de conversar.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ variant: "white", className: "w-full" })}
          >
            <span className="relative">Simular com um consultor</span>
          </a>
          <p className="mt-3 text-xs leading-relaxed text-white/60">
            Simulação ilustrativa pela Tabela Price, sem seguros e taxas. Condições sujeitas à análise de crédito.
          </p>
        </div>
      </div>
    </div>
  );
}

interface SliderFieldProps {
  id: string;
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}

function SliderField({ id, label, valueLabel, min, max, step, value, onChange }: SliderFieldProps) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
        </label>
        <span className="text-sm font-medium text-brand-blue">{valueLabel}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
