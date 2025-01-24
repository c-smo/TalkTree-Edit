import { SETTINGS } from "../../globals";
import { COLORS } from "./colors_globals";

export const colors_add = (color_name: string, hex: string) => {
  const lowered_name = color_name.toLowerCase();
  const key = lowered_name as keyof typeof COLORS;
  COLORS[key] = hex;
};

export const colors_default_add = (values: string[]) => {
  SETTINGS.default_colors.background = values[0];
  SETTINGS.default_colors.button = values[1];
  SETTINGS.default_colors.text = values[2];
};
