import dict from "../../assets/dictionary.json";
import { SETTINGS } from "../../globals";
import { FsFile } from "../../types/types";
import { ROOT } from "../../utils/paths";
import { colors_add, colors_default_add } from "../colors/colors_add";
import colors_hexify from "../colors/colors_hexify";
import { fs_read_file_without_extension } from "../fs/fs_read_file";

const process_color = async (): Promise<void> => {
  const file = (await fs_read_file_without_extension(
    dict.colors.fileName,
    ROOT.dir.conf,
  )) as FsFile;

  if (!file.text) return;
  const colors = parse(file.text, 1);
  if (colors) process_COLORS(colors);

  const colors_default = parse(file.text, 0);
  if (colors_default) process_default_colors(colors);

  document.body.style.backgroundColor = SETTINGS.default_colors.background;
};

const process_COLORS = (colors: string[]) => {
  for (const line of colors) {
    const color_name = line.split("#").shift();
    const color = line.split("#").pop();
    if (color === undefined || color_name === undefined) continue;

    const hex = colors_hexify(color);
    if (!hex || !color_name) continue;
    colors_add(color_name, hex);
  }
};

const process_default_colors = (colors_default: string[]) => {
  const values = colors_default.map((line: string) =>
    String(line.split("#").pop()),
  );
  const hex_array = values
    .map((el) => colors_hexify(el))
    .filter((el) => el != null);

  if (hex_array.length === 3) colors_default_add(hex_array);
};

const parse = (string: string, index: number): string[] => {
  return string
    .split("\n\n")
    [index].split("\n")
    .map((el) => el.replace(/ /g, ""));
};

export default process_color;
