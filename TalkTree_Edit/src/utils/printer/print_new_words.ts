import { writeTextFile } from "@tauri-apps/plugin-fs";
import { NEW_WORDS } from "../../globals";
import { err } from "../../plugins/terminal/commands/logs";
import { ROOT } from "../paths";

const print_new_words = async (): Promise<void> => {
  const output = [...NEW_WORDS()] as string[];
  await writeTextFile(ROOT.file.new_words, output.join("\n")).catch((e) =>
    err(e),
  );
};

export default print_new_words;
