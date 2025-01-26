import { CURRENT_SHEET, SETTINGS } from "../../globals";
import { COLORS } from "./colors_globals";

const colors_get = (color_name: string, link: string): string => {
  const key = color_name.toLowerCase() as keyof typeof COLORS;
  const hex = COLORS[key] ? COLORS[key] : SETTINGS.default_colors.button;

  return should_darken(link) ? darken_hex(hex) : hex;
};

const should_darken = (link: string) => {
  return link != "empty_cell" && link != "-" && link != CURRENT_SHEET();
};

function darken_hex(hex: string, amount: number = 0.3): string {
  hex = hex.replace(/^#/, "");

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  const darken = (color: number): number => color * (1 - amount);

  const newR = darken(r);
  const newG = darken(g);
  const newB = darken(b);

  return `rgb(${newR},${newG},${newB})`;
}

export default colors_get;
