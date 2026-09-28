# RE/MAX Inside Imóveis

Front-end premium para a franquia RE/MAX Inside Imóveis (Rio de Janeiro, médio e alto padrão).

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · Framer Motion · Lucide React

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Estrutura

```
app/                 rotas (/, /imoveis, /imovel/[id]), layout, SEO (sitemap, robots)
components/
  layout/            Navbar (transparente → sólida), Footer, Logo, WhatsAppFloat
  home/              Hero, SearchBar, Stats, FeaturedProperties, Neighborhoods, About, Brokers, Testimonials, CTA
  property/          PropertyCard, Gallery (lightbox), MortgageSimulator, ContactForm, MapPlaceholder
  listing/           Filters, Pagination, ListingClient, ListingSkeleton
  ui/                Button, Reveal, Counter, Skeleton, SafeImage, SelectField, SectionHeading
data/                properties (12 imóveis), neighborhoods, brokers, testimonials, images
lib/                 constants, utils, filtros/ordenação
types/               tipos compartilhados
```

## Personalizar antes de publicar

- `lib/constants.ts`: telefone, WhatsApp (`55DDDNÚMERO`), e-mail, endereço, CRECI, redes sociais e `NEXT_PUBLIC_SITE_URL`.
- `components/layout/Logo.tsx`: wordmark provisório. Trocar pelo logotipo oficial da franquia.
- `data/*`: imóveis, corretores e depoimentos são fictícios. Corretores: trocar fotos e números.
- Imagens do Unsplash: verifique a licença. Se alguma URL falhar, o `SafeImage` mostra um fallback.
- `components/property/ContactForm.tsx`: envio simulado. Integrar com API/CRM (há um `TODO`).
- Hero em vídeo: veja o comentário em `components/home/Hero.tsx`.

## Filtros da listagem (URL)

`/imoveis?finalidade=venda|aluguel&bairro=Leblon&tipo=Cobertura&preco=5m-10m&quartos=3&ordem=menor-preco&pagina=2`
