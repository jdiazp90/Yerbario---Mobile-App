// Controlled vocabulary for aroma tags — grounded in how real yerba mate
// tasters/sommeliers describe it (Escuela Argentina de Sommeliers-style
// dry/wet aroma categories: verde, tostado/ahumado, amaderado, cítrico),
// not an invented list. Kept intentionally small (a v1 wheel), not the full
// breadth of a coffee-scale flavor wheel.

export const AROMA_CATEGORIES: { category: string; tags: string[] }[] = [
  {
    category: "Verde / herbáceo",
    tags: ["Hierba fresca", "Heno", "Vegetal"],
  },
  {
    category: "Tostado / ahumado",
    tags: ["Tostado", "Ahumado (barbacuá)", "Tabaco", "Cacao amargo"],
  },
  {
    category: "Terroso / amaderado",
    tags: ["Madera", "Monte", "Camino de tierra"],
  },
  {
    category: "Cítrico / floral",
    tags: ["Cítrico", "Floral"],
  },
  {
    category: "Otros",
    tags: ["Aceituna negra", "Dulzón", "Picante"],
  },
];
