import { writeTextFile } from "@tauri-apps/plugin-fs";
import dict from "../../assets/dictionary.json" assert { type: "json" };
import { SETTINGS } from "../../globals";
import { err } from "../../plugins/terminal/commands/logs";
import { ROOT } from "../paths";

const print_server = async (): Promise<void> => {
  const output = [SETTINGS.server_ip];

  try {
    await writeTextFile(ROOT.file.server, output.join("\n"));
  } catch (error) {
    err("🔥🖨️🔥");
  }
};

export const swap_bool_for_string = (b: boolean) => {
  return b === true ? dict.misc.boolean_true : dict.misc.boolean_false;
};

export default print_server;
