"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  propertyTitle?: string;
  propertyId?: string;
}

type Errors = Partial<Record<"name" | "email" | "phone" | "consent", string>>;

export function ContactForm({ propertyTitle, propertyId }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const defaultMessage = propertyTitle
    ? `Olá! Tenho interesse no imóvel "${propertyTitle}"${propertyId ? ` (${propertyId.toUpperCase()})` : ""}. Gostaria de agendar uma visita.`
    : "Olá! Gostaria de mais informações.";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").replace(/\D/g, "");
    const consent = data.get("consent") === "on";

    const next: Errors = {};
    if (name.length < 3) next.name = "Informe seu nome completo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Informe um e-mail válido.";
    if (phone.length < 10) next.phone = "Informe um telefone com DDD.";
    if (!consent) next.consent = "É necessário aceitar para continuar.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("loading");
    // TODO: integrar com API/CRM (ex.: route handler + Resend/HubSpot).
    setTimeout(() => setStatus("success"), 1200);
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-6 text-center" role="status">
        <CheckCircle2 className="h-12 w-12 text-emerald-600" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold text-ink">Mensagem enviada!</h3>
        <p className="mt-2 text-sm text-ink-soft">
          Um de nossos consultores entrará em contato em breve.
        </p>
        <Button variant="outline" size="sm" className="mt-6" onClick={() => setStatus("idle")}>
          Enviar nova mensagem
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <Field id="cf-name" label="Nome" error={errors.name}>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "cf-name-error" : undefined}
          className={inputClass(!!errors.name)}
        />
      </Field>
      <Field id="cf-email" label="E-mail" error={errors.email}>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cf-email-error" : undefined}
          className={inputClass(!!errors.email)}
        />
      </Field>
      <Field id="cf-phone" label="Telefone / WhatsApp" error={errors.phone}>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(21) 99999-9999"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "cf-phone-error" : undefined}
          className={inputClass(!!errors.phone)}
        />
      </Field>
      <Field id="cf-message" label="Mensagem">
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          defaultValue={defaultMessage}
          className={cn(inputClass(false), "h-auto resize-none py-3")}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-ink-soft">
          <input
            type="checkbox"
            name="consent"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "cf-consent-error" : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-mist-dark accent-brand-red"
          />
          <span>
            Concordo em receber contato da RE/MAX Inside Imóveis e com o tratamento dos meus dados conforme a LGPD.
          </span>
        </label>
        {errors.consent && (
          <p id="cf-consent-error" role="alert" className="mt-1.5 text-xs font-medium text-brand-red">
            {errors.consent}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" loading={status === "loading"} className="w-full">
        {status === "loading" ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "h-12 w-full rounded-xl border bg-white px-4 text-sm text-ink transition-colors placeholder:text-ink-muted/70 hover:border-brand-blue/50",
    hasError ? "border-brand-red" : "border-mist-dark",
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-brand-red">
          {error}
        </p>
      )}
    </div>
  );
}
