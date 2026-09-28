export type Purpose = "venda" | "aluguel";
export type PropertyType = "Apartamento" | "Cobertura" | "Casa" | "Casa em condomínio";
export type NeighborhoodName =
  | "Barra da Tijuca"
  | "Recreio"
  | "Leblon"
  | "Ipanema"
  | "Botafogo"
  | "Tijuca";
export type PropertyBadge = "Novo" | "Destaque";
export type SortKey = "relevancia" | "menor-preco" | "maior-preco" | "maior-area" | "recentes";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  purpose: Purpose;
  neighborhood: NeighborhoodName;
  address: string;
  price: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parking: number;
  area: number;
  yearBuilt: number;
  condoFee?: number;
  iptu?: number;
  badge?: PropertyBadge;
  featured: boolean;
  listedAt: string;
  description: string;
  features: string[];
  images: string[];
}

export interface NeighborhoodInfo {
  name: NeighborhoodName;
  count: number;
  image: string;
  blurb: string;
}

export interface Broker {
  id: string;
  name: string;
  specialty: string;
  creci: string;
  photo: string;
  whatsapp: string;
  linkedin: string;
}

export interface Testimonial {
  id: string;
  name: string;
  context: string;
  text: string;
  rating: number;
}

export interface PriceRange {
  id: string;
  label: string;
  min?: number;
  max?: number;
}
