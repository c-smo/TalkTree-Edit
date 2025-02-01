import { writeFile } from "@tauri-apps/plugin-fs";
import { SETTINGS } from "../../globals";
import { err } from "../../plugins/terminal/commands/logs";
import { GRID } from "../grid";
import { ROOT } from "../paths";

let allow_print = true;

const print_image_template = async (): Promise<void> => {
  if (allow_print === false) return;
  allow_print = false;
  const canvas = document.createElement("canvas");

  const width = Math.floor(GRID.cell_width * 2);
  const height = Math.floor(GRID.cell_height * 2);
  await print_png(canvas, width, height, ROOT.file.image_template).catch((e) =>
    err(e),
  );

  const scaled_height = Math.floor(height * 0.75);
  await print_png(
    canvas,
    width,
    scaled_height,
    ROOT.file.image_template2,
  ).catch((e) => err(e));

  canvas.remove();
};

const print_png = async (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  path: string,
) => {
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = SETTINGS.default_colors.button;
  ctx.fillRect(0, 0, width, height);
  const base64 = canvas.toDataURL("image/png").split(",")[1];
  const binaray = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
  await writeFile(path, binaray).catch((e) => err(e));
};

export default print_image_template;
