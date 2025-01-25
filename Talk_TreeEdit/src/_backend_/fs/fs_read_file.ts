import { join } from "@tauri-apps/api/path";
import { readDir, readFile } from "@tauri-apps/plugin-fs";
import { err } from "../../plugins/terminal/commands/logs";
import { FsFile } from "../../types/types";

export const fs_read_file_without_extension = async (
  file_name: string,
  dir: string,
): Promise<FsFile | null> => {
  try {
    const files = await readDir(dir);
    for (const file of files) {
      if (file.name.includes(file_name)) {
        const path = await join(dir, file.name);
        const binary = await readFile(path);
        const decoder = new TextDecoder("utf-8");
        const text = decoder.decode(binary);
        return {
          fileName: file.name,
          fileType: file.name.split(".").pop() || "",
          binary: new Uint8Array(binary),
          text,
        };
      }
    }
  } catch (error) {
    err(error);
  }
  return null;
};
