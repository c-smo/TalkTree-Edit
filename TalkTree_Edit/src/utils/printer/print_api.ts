import { writeTextFile } from "@tauri-apps/plugin-fs";
import dict from "../../assets/dictionary.json" assert { type: "json" };
import API from "../../plugins/api/__api_main__";
import { err } from "../../plugins/terminal/commands/logs";
import { ROOT } from "../paths";

const print_api = async (): Promise<void> => {
  const keys = Object.values(dict.api_speechgen.data);
  const values = Object.values(API.expected_data);
  const output = [];

  for (let i = 0; i < keys.length; i++) {
    output.push(`${keys[i]}: ${values[i]}`);
  }

  await writeTextFile(ROOT.file.api, output.join("\n")).catch((e) => err(e));
};

export default print_api;
