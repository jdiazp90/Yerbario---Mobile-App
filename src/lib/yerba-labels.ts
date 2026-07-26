import type { OriginCountry, StickPresence, YerbaType } from "@/types/database";

export const TYPE_LABELS: Record<YerbaType, string> = {
  tradicional: "Tradicional",
  compuesta: "Compuesta",
  despalada: "Despalada",
};

export const STICK_LABELS: Record<StickPresence, string> = {
  con_palo: "Con palo",
  sin_palo: "Sin palo",
};

export const ORIGIN_LABELS: Record<OriginCountry, string> = {
  AR: "Argentina",
  UY: "Uruguay",
  BR: "Brasil",
  PY: "Paraguay",
};
