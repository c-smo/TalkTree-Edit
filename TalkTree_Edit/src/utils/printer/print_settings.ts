import { writeTextFile } from "@tauri-apps/plugin-fs";
import dict from "../../assets/dictionary.json" assert { type: "json" };
import { SETTINGS } from "../../globals";
import { err } from "../../plugins/terminal/commands/logs";
import { ROOT } from "../paths";

const print_settings = async (): Promise<void> => {
  const keys = Object.values(dict.settings.data);
  const values = Object.values(SETTINGS);
  const output = [];

  for (let i = 0; i < keys.length; i++) {
    if (typeof values[i] === "boolean") {
      output.push(`${keys[i]}: ${swap_bool_for_string(values[i] as boolean)}`);
    } else {
      output.push(`${keys[i]}: ${values[i]}`);
    }
  }

  await writeTextFile(ROOT.file.conf, output.join("\n")).catch((e) => err(e));
};

const swap_bool_for_string = (b: boolean) => {
  return b === true ? dict.misc.boolean_true : dict.misc.boolean_false;
};

export default print_settings;
