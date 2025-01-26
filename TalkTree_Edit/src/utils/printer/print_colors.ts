import { writeTextFile } from "@tauri-apps/plugin-fs";
import { COLORS } from "../../_backend_/colors/colors_globals";
import dict from "../../assets/dictionary.json" assert { type: "json" };
import { SETTINGS } from "../../globals";
import { err } from "../../plugins/terminal/commands/logs";
import { ROOT } from "../paths";

const print_colors = async (): Promise<void> => {
  const output = [] as string[];

  append(dict.colors_default, SETTINGS.default_colors, output);
  output.push("");
  append(dict.colors, COLORS, output);

  await writeTextFile(ROOT.file.color, output.join("\n")).catch((e) => err(e));
};

const append = (dict: any, parent: any, output: string[]) => {
  const keys = Object.values(dict.data);
  const values = Object.values(parent);
  output.push(`[${dict.title}]`);

  for (let i = 0; i < keys.length; i++) {
    const line = `${keys[i]} ${values[i]}`;
    output.push(line);
  }
};

export default print_colors;
