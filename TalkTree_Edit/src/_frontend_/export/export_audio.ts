import { join } from "@tauri-apps/api/path";
import { writeFile } from "@tauri-apps/plugin-fs";
import { err } from "../../plugins/terminal/commands/logs";
import { SqlWrapper } from "../../types/types";
import { ROOT } from "../../utils/paths";

export const export_audio = async (wrapper: SqlWrapper): Promise<void> => {
  try {
    const file_name = `${wrapper.file_name}.mp3`;
    const path = await join(ROOT.dir.audio, file_name);
    const buffer = new Uint8Array(wrapper.value);
    await writeFile(path, buffer);
  } catch (e) {
    err(e);
  }
};
