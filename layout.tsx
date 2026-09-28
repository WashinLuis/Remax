import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { HERO_IMAGE } from "@/data/images";
import { SITE } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const title = "RE/MAX Inside Imóveis | Imóveis de alto padrão no Rio de Janeiro";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: "%s | RE/MAX Inside Imóveis" },
  description: SITE.description,
  keywords: [
    "imobiliária Rio de Janeiro",
    "imóveis alto padrão",
    "apartamentos Leblon",
    "coberturas Barra da Tijuca",
    "casas Recreio",
    "RE/MAX",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
    title,
    description: SITE.description,
    images: [{ url: HERO_IMAGE, width: 2400, height: 1600, alt: "Imóvel de luxo no Rio de Janeiro" }],
  },
  twitter: { card: "summary_large_image", title, description: SITE.description, images: [HERO_IMAGE] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#003DA5",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. das Américas, 3500",
    addressLocality: "Rio de Janeiro",
    addressRegion: "RJ",
    addressCountry: "BR",
  },
  areaServed: "Rio de Janeiro",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only z-[70] rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>
        <Navbar />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
