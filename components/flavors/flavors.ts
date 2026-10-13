import type { FruitId } from "./fruit-sprite";

export type Palette = {
  /** Stage background */
  bg: string;
  /** Text colour */
  ink: string;
  /** Accent for small details */
  accent: string;
  /** Tint of the soft serve */
  yogurt: string;
  /** Colour of the giant word behind the cup */
  giant: string;
  /** Drizzle colour; flavours without one keep the swirl clean */
  sauce?: string;
};

/** Fruit that drops into the swirl. sx/sy: start offset in product widths/heights. tx/ty: target in product units. */
export type Diver = { id: FruitId; size: number; sx: number; sy: number; tx: number; ty: number; rot: number };

/** Garnish resting on the swirl, in product units (400 × 540). */
export type Topping = { id: FruitId; x: number; y: number; size: number; rot: number };

/** Fruit drifting around the stage; position comes from SLOTS by index. */
export type Floater = { id: FruitId; rot: number; scale?: number };

export type Flavor = {
  id: string;
  name: string;
  title: string[];
  giant: string;
  tag: string;
  description: string;
  ingredients: { id?: FruitId; label: string }[];
  palette: Palette;
  floaters: Floater[];
  divers: Diver[];
  toppings: Topping[];
};

/**
 * Composition slots for floating fruit. x/y: desktop position (% of stage),
 * mx/my: mobile position, s: size in vmin, blur: depth of field.
 */
export const SLOTS = [
  { x: 37, y: 12, mx: 9, my: 8, s: 7, layer: "back", blur: 0 },
  { x: 63, y: 15, mx: 88, my: 9, s: 8.5, layer: "back", blur: 0 },
  { x: 89, y: 15, mx: 93, my: 33, s: 13, layer: "front", blur: 1.5 },
  { x: 5, y: 86, mx: 4, my: 40, s: 17, layer: "front", blur: 5 },
  { x: 93, y: 84, mx: 90, my: 51, s: 12, layer: "front", blur: 2.5 },
  { x: 40, y: 84, mx: 10, my: 25, s: 7.5, layer: "back", blur: 0 },
  { x: 68, y: 78, mx: 74, my: 30, s: 6, layer: "back", blur: 0.6 },
] as const;

/** Yogurt droplets thrown up when the fruit lands: end offsets in product widths. */
export const SPLASH = [
  { x: -0.2, y: -0.2, s: 1 },
  { x: -0.12, y: -0.3, s: 0.7 },
  { x: -0.04, y: -0.36, s: 0.9 },
  { x: 0.06, y: -0.34, s: 0.6 },
  { x: 0.14, y: -0.28, s: 1 },
  { x: 0.22, y: -0.16, s: 0.75 },
  { x: -0.26, y: -0.08, s: 0.55 },
  { x: 0.28, y: -0.05, s: 0.6 },
];

export const FLAVORS: Flavor[] = [
  {
    id: "natural",
    name: "Natural",
    title: ["Natural"],
    giant: "NATURAL",
    tag: "Nuestra base",
    description:
      "Yogurt griego cremoso, alto en proteína y con cultivos vivos. El lienzo perfecto para cada sabor.",
    ingredients: [{ id: "yogurt", label: "Yogurt griego" }, { id: "honey", label: "Miel de abeja" }, { id: "walnut", label: "Nuez" }],
    palette: { bg: "#f7f4ed", ink: "#013f7d", accent: "#d2a557", yogurt: "#fbf8f1", giant: "#ece4d4" },
    floaters: [
      { id: "honey", rot: -14 },
      { id: "walnut", rot: 30 },
      { id: "honey", rot: 12, scale: 0.8 },
      { id: "walnut", rot: -20, scale: 0.9 },
      { id: "honey", rot: -6, scale: 0.9 },
    ],
    divers: [],
    toppings: [],
  },
  {
    id: "fresa",
    name: "Fresa",
    title: ["Fresa"],
    giant: "FRESA",
    tag: "Favorito de la casa",
    description:
      "Fresas frescas cortadas a mano y mezcladas en nuestro yogurt griego. Dulce, ácido y perfectamente cremoso.",
    ingredients: [{ id: "strawberry", label: "Fresa fresca" }, { id: "mint", label: "Hierbabuena" }, { id: "honey", label: "Miel de abeja" }],
    palette: { bg: "#f8dedc", ink: "#7a1426", accent: "#d7263d", yogurt: "#f7c4ca", giant: "#f2cbc8", sauce: "#c8162f" },
    floaters: [
      { id: "strawberry", rot: -18 },
      { id: "strawberry-half", rot: 22 },
      { id: "strawberry", rot: 14 },
      { id: "strawberry-half", rot: -26 },
      { id: "strawberry", rot: -10 },
      { id: "mint", rot: 36 },
      { id: "strawberry-half", rot: 10 },
    ],
    divers: [
      { id: "strawberry", size: 70, sx: -1.5, sy: -1.35, tx: 160, ty: 214, rot: -20 },
      { id: "strawberry-half", size: 64, sx: 1.4, sy: -1.2, tx: 246, ty: 222, rot: 18 },
      { id: "strawberry", size: 62, sx: -0.3, sy: -1.6, tx: 200, ty: 190, rot: 8 },
      { id: "strawberry-half", size: 60, sx: 0.9, sy: -1.5, tx: 222, ty: 250, rot: -12 },
      { id: "strawberry", size: 58, sx: -1.1, sy: -1.45, tx: 178, ty: 256, rot: 16 },
    ],
    toppings: [
      { id: "strawberry-half", x: 88, y: 292, size: 74, rot: -20 },
      { id: "strawberry-half", x: 314, y: 284, size: 70, rot: 18 },
      { id: "strawberry-half", x: 150, y: 316, size: 54, rot: -6 },
      { id: "strawberry-half", x: 258, y: 318, size: 52, rot: 10 },
      { id: "strawberry-half", x: 222, y: 244, size: 46, rot: 6 },
      { id: "strawberry", x: 206, y: 64, size: 70, rot: 6 },
      { id: "mint", x: 246, y: 98, size: 44, rot: 28 },
    ],
  },
  {
    id: "mango",
    name: "Mango",
    title: ["Mango"],
    giant: "MANGO",
    tag: "Sabor tropical",
    description:
      "Mango Ataulfo en su punto: jugoso, aromático y con ese dulzor natural que solo da la temporada.",
    ingredients: [{ id: "mango-whole", label: "Mango Ataulfo" }, { id: "mango", label: "Coulis de mango" }, { id: "mint", label: "Hierbabuena" }],
    palette: { bg: "#fce9c2", ink: "#7a3e05", accent: "#ee8a12", yogurt: "#ffd98e", giant: "#f7dc9f", sauce: "#f39b12" },
    floaters: [
      { id: "mango", rot: -16 },
      { id: "mango-whole", rot: 20 },
      { id: "mango", rot: 28 },
      { id: "mango-whole", rot: -24 },
      { id: "mango", rot: -8 },
      { id: "mango", rot: 40, scale: 0.9 },
      { id: "mint", rot: -24 },
    ],
    divers: [
      { id: "mango", size: 58, sx: -1.45, sy: -1.3, tx: 164, ty: 218, rot: -24 },
      { id: "mango", size: 54, sx: 1.35, sy: -1.25, tx: 240, ty: 214, rot: 30 },
      { id: "mango", size: 56, sx: 0.2, sy: -1.6, tx: 204, ty: 196, rot: 12 },
      { id: "mango", size: 52, sx: -0.8, sy: -1.55, tx: 186, ty: 254, rot: 8 },
      { id: "mango", size: 50, sx: 1, sy: -1.45, tx: 224, ty: 258, rot: -16 },
    ],
    toppings: [
      { id: "mango", x: 90, y: 292, size: 58, rot: -14 },
      { id: "mango", x: 312, y: 286, size: 56, rot: 16 },
      { id: "mango", x: 152, y: 318, size: 48, rot: 6 },
      { id: "mango", x: 256, y: 316, size: 50, rot: -10 },
      { id: "mango", x: 220, y: 242, size: 42, rot: 22 },
      { id: "mango", x: 174, y: 186, size: 36, rot: -8 },
      { id: "mint", x: 214, y: 74, size: 52, rot: -18 },
    ],
  },
  {
    id: "moras",
    name: "Moras",
    title: ["Moras"],
    giant: "MORAS",
    tag: "Frutos del bosque",
    description:
      "Arándanos, frambuesas y zarzamoras que tiñen el yogurt de violeta. Fresco, intenso y lleno de antioxidantes.",
    ingredients: [{ id: "blueberry", label: "Arándano" }, { id: "raspberry", label: "Frambuesa" }, { id: "blackberry", label: "Zarzamora" }],
    palette: { bg: "#e7def0", ink: "#3b1854", accent: "#6c3a9c", yogurt: "#d9bfe6", giant: "#dacce9", sauce: "#5a2380" },
    floaters: [
      { id: "blueberry", rot: 0 },
      { id: "raspberry", rot: 18 },
      { id: "blackberry", rot: -14 },
      { id: "raspberry", rot: -22 },
      { id: "blueberry", rot: 10 },
      { id: "blackberry", rot: 24, scale: 0.9 },
      { id: "blueberry", rot: -6, scale: 0.9 },
    ],
    divers: [
      { id: "raspberry", size: 58, sx: -1.5, sy: -1.3, tx: 166, ty: 216, rot: -18 },
      { id: "blueberry", size: 46, sx: 1.4, sy: -1.2, tx: 238, ty: 214, rot: 20 },
      { id: "blackberry", size: 56, sx: -0.25, sy: -1.6, tx: 202, ty: 194, rot: 6 },
      { id: "blueberry", size: 44, sx: 0.95, sy: -1.5, tx: 226, ty: 256, rot: -8 },
      { id: "raspberry", size: 52, sx: -1, sy: -1.45, tx: 180, ty: 254, rot: 14 },
    ],
    toppings: [
      { id: "raspberry", x: 92, y: 290, size: 56, rot: -12 },
      { id: "blueberry", x: 142, y: 318, size: 40, rot: 0 },
      { id: "blackberry", x: 250, y: 316, size: 50, rot: 12 },
      { id: "raspberry", x: 312, y: 282, size: 54, rot: 10 },
      { id: "blueberry", x: 206, y: 250, size: 36, rot: 0 },
      { id: "blackberry", x: 160, y: 198, size: 40, rot: -10 },
      { id: "blueberry", x: 294, y: 314, size: 34, rot: 0 },
      { id: "raspberry", x: 214, y: 70, size: 54, rot: 4 },
      { id: "mint", x: 180, y: 92, size: 40, rot: -32 },
    ],
  },
  {
    id: "pistache",
    name: "Pistache",
    title: ["Pistache"],
    giant: "PISTACHE",
    tag: "Receta especial",
    description:
      "Pistache tostado y molido al momento, con un toque de sal que hace brillar la cremosidad del yogurt.",
    ingredients: [{ id: "pistachio", label: "Pistache tostado" }, { id: "pistachio-shell", label: "Crema de pistache" }, { id: "crumbs", label: "Pistache molido" }],
    palette: { bg: "#e4ebcb", ink: "#2f4a12", accent: "#6e9a2e", yogurt: "#d4e1a4", giant: "#d3ddae", sauce: "#8db33a" },
    floaters: [
      { id: "pistachio-shell", rot: -12 },
      { id: "pistachio", rot: 24 },
      { id: "pistachio-shell", rot: 30 },
      { id: "pistachio", rot: -20 },
      { id: "pistachio-shell", rot: -36 },
      { id: "pistachio", rot: 12, scale: 0.9 },
      { id: "crumbs", rot: 0, scale: 1.2 },
    ],
    divers: [
      { id: "pistachio", size: 54, sx: -1.5, sy: -1.3, tx: 168, ty: 214, rot: -30 },
      { id: "pistachio-shell", size: 60, sx: 1.4, sy: -1.25, tx: 236, ty: 216, rot: 24 },
      { id: "pistachio", size: 50, sx: -0.2, sy: -1.6, tx: 204, ty: 196, rot: 10 },
      { id: "pistachio-shell", size: 54, sx: 0.95, sy: -1.5, tx: 224, ty: 254, rot: -20 },
      { id: "pistachio", size: 48, sx: -1, sy: -1.45, tx: 182, ty: 252, rot: 30 },
    ],
    toppings: [
      { id: "crumbs", x: 104, y: 296, size: 72, rot: 0 },
      { id: "crumbs", x: 296, y: 290, size: 72, rot: 40 },
      { id: "crumbs", x: 200, y: 316, size: 78, rot: 12 },
      { id: "crumbs", x: 168, y: 242, size: 56, rot: -20 },
      { id: "crumbs", x: 248, y: 234, size: 54, rot: 60 },
      { id: "crumbs", x: 204, y: 180, size: 46, rot: 30 },
      { id: "pistachio", x: 312, y: 268, size: 46, rot: 24 },
      { id: "pistachio-shell", x: 98, y: 314, size: 50, rot: -14 },
      { id: "pistachio", x: 212, y: 76, size: 48, rot: -20 },
    ],
  },
  {
    id: "higo",
    name: "Higo & miel",
    title: ["Higo", "& miel"],
    giant: "HIGO",
    tag: "Inspiración griega",
    description:
      "La receta de las islas: higos maduros, nuez y un hilo de miel de abeja sobre yogurt griego natural.",
    ingredients: [{ id: "fig", label: "Higo maduro" }, { id: "honey", label: "Miel de abeja" }, { id: "walnut", label: "Nuez" }],
    palette: { bg: "#f2e2d2", ink: "#4a1838", accent: "#8e3b6a", yogurt: "#ecc9c8", giant: "#ead0bd", sauce: "#eaa612" },
    floaters: [
      { id: "fig-half", rot: -14 },
      { id: "honey", rot: 10 },
      { id: "fig", rot: 18 },
      { id: "fig-half", rot: 22 },
      { id: "walnut", rot: -18 },
      { id: "honey", rot: -8, scale: 0.9 },
      { id: "walnut", rot: 30, scale: 0.9 },
    ],
    divers: [
      { id: "fig", size: 64, sx: -1.5, sy: -1.3, tx: 166, ty: 216, rot: -16 },
      { id: "walnut", size: 52, sx: 1.4, sy: -1.2, tx: 238, ty: 214, rot: 24 },
      { id: "fig-half", size: 62, sx: -0.25, sy: -1.6, tx: 202, ty: 196, rot: 8 },
      { id: "honey", size: 40, sx: 0.95, sy: -1.5, tx: 226, ty: 254, rot: 0 },
      { id: "fig", size: 56, sx: -1, sy: -1.45, tx: 180, ty: 254, rot: 12 },
    ],
    toppings: [
      { id: "fig-half", x: 92, y: 290, size: 74, rot: -16 },
      { id: "fig-half", x: 310, y: 286, size: 70, rot: 14 },
      { id: "walnut", x: 152, y: 318, size: 44, rot: 8 },
      { id: "walnut", x: 256, y: 318, size: 42, rot: -12 },
      { id: "walnut", x: 230, y: 238, size: 36, rot: 10 },
      { id: "fig-half", x: 206, y: 66, size: 62, rot: 4 },
      { id: "honey", x: 170, y: 184, size: 24, rot: 0 },
      { id: "honey", x: 264, y: 184, size: 22, rot: 0 },
    ],
  },
];
