/** Monta URL de imagem do Unsplash a partir do ID da foto. */
export const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const HERO_IMAGE = unsplash("1613490493576-7fde63acd811", 2400);
export const TEAM_IMAGE = unsplash("1522071820081-009f0129c71c", 1600);
