import { writeTextFile } from "@tauri-apps/plugin-fs";
import { SETTINGS } from "../../globals";
import { err } from "../../plugins/terminal/commands/logs";
import { ROOT } from "../paths";

const print_server = async (): Promise<void> => {
  const output = [SETTINGS.server_ip];
  await writeTextFile(ROOT.file.server, output.join("\n")).catch((e) => err(e));
};

export default print_server;
