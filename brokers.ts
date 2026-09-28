import type { Broker } from "@/types";
import { unsplash } from "./images";

export const brokers: Broker[] = [
  {
    id: "rafael-monteiro",
    name: "Rafael Monteiro",
    specialty: "Alto padrão na Zona Sul",
    creci: "CRECI-RJ 00001",
    photo: unsplash("1560250097-0b93528c311a", 900),
    whatsapp: "5521999990001",
    linkedin: "https://www.linkedin.com/",
  },
  {
    id: "camila-andrade",
    name: "Camila Andrade",
    specialty: "Barra da Tijuca e Recreio",
    creci: "CRECI-RJ 00002",
    photo: unsplash("1573496359142-b8d87734a5a2", 900),
    whatsapp: "5521999990002",
    linkedin: "https://www.linkedin.com/",
  },
  {
    id: "bruno-salgado",
    name: "Bruno Salgado",
    specialty: "Investimentos e coberturas",
    creci: "CRECI-RJ 00003",
    photo: unsplash("1472099645785-5658abf4ff4e", 900),
    whatsapp: "5521999990003",
    linkedin: "https://www.linkedin.com/",
  },
];
