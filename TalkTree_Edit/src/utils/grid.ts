import { SETTINGS } from "../globals";
import { Grid } from "../types/types";
import { set_css_global } from "./helpers";

const MARGIN_PERCENTAGE = 0.05;

export const GRID = {} as Grid;

export function create_grid() {
  const cols = SETTINGS.cols;
  const rows = SETTINGS.rows;
  const margin =
    Math.min(window.innerWidth, window.innerHeight) * MARGIN_PERCENTAGE;
  const gap = margin;

  Object.assign(GRID, { rows, cols, margin, gap });

  const gc = document.querySelector(".grid-container")! as HTMLElement;

  gc.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  gc.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  gc.style.width = `calc(100vw - ${margin * 2}px)`;
  gc.style.height = `calc(100vh - ${margin * 2}px)`;
  gc.style.margin = `${margin}px`;
  gc.style.gap = `${margin}px`;
}

export const set_grid_cell_size = () => {
  const element = document.querySelector(".grid-cell")!;
  const { width, height } = element.getBoundingClientRect();
  GRID.cell_height = Math.floor(height);
  GRID.cell_width = Math.floor(width);
  set_css_global(
    "--global-subtitle-size",
    `${Math.floor(GRID.cell_height * 0.2)}px`,
  );
};
