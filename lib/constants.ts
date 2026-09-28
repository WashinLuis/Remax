import type { NeighborhoodName, PriceRange, Purpose, PropertyType, SortKey } from "@/types";

export const SITE = {
  name: "RE/MAX Inside Imóveis",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://remaxinside.com.br",
  description:
    "Especialistas em imóveis exclusivos no Rio de Janeiro. Apartamentos, coberturas e casas de médio e alto padrão na Barra da Tijuca, Leblon, Ipanema, Botafogo, Recreio e Tijuca.",
  phone: "(21) 3000-0000",
  whatsapp: "5521999999999",
  whatsappDisplay: "(21) 99999-9999",
  email: "contato@remaxinside.com.br",
  address: "Av. das Américas, 3500 – Barra da Tijuca, Rio de Janeiro – RJ",
  creci: "CRECI-RJ 00000-J",
  instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/",
} as const;

export const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Imóveis", href: "/imoveis" },
  { label: "Bairros", href: "/#bairros" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Corretores", href: "/#corretores" },
] as const;

export const PROPERTY_TYPES: PropertyType[] = ["Apartamento", "Cobertura", "Casa", "Casa em condomínio"];

export const NEIGHBORHOOD_NAMES: NeighborhoodName[] = [
  "Barra da Tijuca",
  "Recreio",
  "Leblon",
  "Ipanema",
  "Botafogo",
  "Tijuca",
];

export const PRICE_RANGES: Record<Purpose, PriceRange[]> = {
  venda: [
    { id: "ate-2m", label: "Até R$ 2 mi", max: 2_000_000 },
    { id: "2m-5m", label: "R$ 2 mi a R$ 5 mi", min: 2_000_000, max: 5_000_000 },
    { id: "5m-10m", label: "R$ 5 mi a R$ 10 mi", min: 5_000_000, max: 10_000_000 },
    { id: "10m-mais", label: "Acima de R$ 10 mi", min: 10_000_000 },
  ],
  aluguel: [
    { id: "ate-10k", label: "Até R$ 10 mil", max: 10_000 },
    { id: "10k-20k", label: "R$ 10 mil a R$ 20 mil", min: 10_000, max: 20_000 },
    { id: "20k-mais", label: "Acima de R$ 20 mil", min: 20_000 },
  ],
};

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "relevancia", label: "Mais relevantes" },
  { value: "recentes", label: "Mais recentes" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "maior-area", label: "Maior área" },
];

export const PAGE_SIZE = 6;
