import { properties } from "@/data/properties";
import { PRICE_RANGES, SORT_OPTIONS } from "./constants";
import type { Property, Purpose, SortKey } from "@/types";

export const getAllProperties = () => properties;

export const getPropertyById = (id: string) => properties.find((p) => p.id === id);

export const getFeaturedProperties = (limit = 6) => properties.filter((p) => p.featured).slice(0, limit);

export function getRelatedProperties(property: Property, limit = 3) {
  const score = (p: Property) =>
    (p.neighborhood === property.neighborhood ? 2 : 0) + (p.type === property.type ? 1 : 0);
  return properties
    .filter((p) => p.id !== property.id && p.purpose === property.purpose)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}

export interface ListingFilters {
  purpose: Purpose;
  neighborhood: string;
  type: string;
  price: string;
  bedrooms: number;
  sort: SortKey;
  page: number;
}

type ParamsLike = { get(name: string): string | null };

export function parseFilters(params: ParamsLike): ListingFilters {
  const purposeRaw = params.get("finalidade");
  const purpose: Purpose = purposeRaw === "aluguel" ? "aluguel" : "venda";
  const sortRaw = params.get("ordem") as SortKey | null;
  const sort: SortKey = SORT_OPTIONS.some((o) => o.value === sortRaw) ? (sortRaw as SortKey) : "relevancia";
  const bedrooms = Math.max(0, Math.min(6, parseInt(params.get("quartos") ?? "0", 10) || 0));
  const page = Math.max(1, parseInt(params.get("pagina") ?? "1", 10) || 1);
  return {
    purpose,
    neighborhood: params.get("bairro") ?? "",
    type: params.get("tipo") ?? "",
    price: params.get("preco") ?? "",
    bedrooms,
    sort,
    page,
  };
}

export function filterProperties(list: Property[], f: ListingFilters) {
  const range = PRICE_RANGES[f.purpose].find((r) => r.id === f.price);
  return list.filter((p) => {
    if (p.purpose !== f.purpose) return false;
    if (f.neighborhood && p.neighborhood !== f.neighborhood) return false;
    if (f.type && p.type !== f.type) return false;
    if (f.bedrooms && p.bedrooms < f.bedrooms) return false;
    if (range) {
      if (range.min !== undefined && p.price < range.min) return false;
      if (range.max !== undefined && p.price >= range.max) return false;
    }
    return true;
  });
}

export function sortProperties(list: Property[], sort: SortKey) {
  const copy = [...list];
  switch (sort) {
    case "menor-preco":
      return copy.sort((a, b) => a.price - b.price);
    case "maior-preco":
      return copy.sort((a, b) => b.price - a.price);
    case "maior-area":
      return copy.sort((a, b) => b.area - a.area);
    case "recentes":
      return copy.sort((a, b) => b.listedAt.localeCompare(a.listedAt));
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}
