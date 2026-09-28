import type { NeighborhoodInfo } from "@/types";
import { unsplash } from "./images";

export const neighborhoods: NeighborhoodInfo[] = [
  {
    name: "Barra da Tijuca",
    count: 96,
    image: unsplash("1545324418-cc1a3fa10c00", 1000),
    blurb: "Modernidade, condomínios-clube e qualidade de vida.",
  },
  {
    name: "Recreio",
    count: 58,
    image: unsplash("1519046904884-53103b34b206", 1000),
    blurb: "Natureza, praias tranquilas e casas espaçosas.",
  },
  {
    name: "Leblon",
    count: 42,
    image: unsplash("1483729558449-99ef09a8c325", 1000),
    blurb: "O metro quadrado mais desejado do Rio.",
  },
  {
    name: "Ipanema",
    count: 51,
    image: unsplash("1507525428034-b723cf961d3e", 1000),
    blurb: "Charme, gastronomia e o mar na porta de casa.",
  },
  {
    name: "Botafogo",
    count: 47,
    image: unsplash("1516306580123-e6e52b1b7b5f", 1000),
    blurb: "Vida cultural e vista para o Pão de Açúcar.",
  },
  {
    name: "Tijuca",
    count: 56,
    image: unsplash("1441974231531-c6227db76b6e", 1000),
    blurb: "Tradição, verde e ótimo custo-benefício.",
  },
];
