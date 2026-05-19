export const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ??
  "https://rickandmortyapi.com/graphql";

export const MAX_FAVORITES = 5;

export const STATUS_COLORS: Record<string, string> = {
  Alive: "#22c55e",
  Dead: "#ef4444",
  unknown: "#a1a1aa",
};

export const STATUS_LABELS: Record<string, string> = {
  Alive: "Vivo",
  Dead: "Muerto",
  unknown: "Desconocido",
};

export const GENDER_ICONS: Record<string, string> = {
  Male: "♂",
  Female: "♀",
  Genderless: "⚲",
  unknown: "?",
};

export const SPECIES_COLORS = [
  "#00b4d8",
  "#90e0ef",
  "#caf0f8",
  "#48cae4",
  "#0077b6",
  "#023e8a",
  "#03045e",
  "#ade8f4",
  "#0096c7",
  "#00b4d8",
];
