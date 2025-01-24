import { join } from "@tauri-apps/api/path";
import { readDir, readFile } from "@tauri-apps/plugin-fs";
import { err } from "../../plugins/terminal/commands/logs";
import { FsFile } from "../../types/types";

export const fs_read_dir = async (
  dir: string,
  fileType: string,
): Promise<FsFile[]> => {
  const output: FsFile[] = [];

  try {
    const allFiles = await readDir(dir);

    for (const file of allFiles) {
      if (file.isDirectory) continue;
      const endsWithFileType = new RegExp(`\\.${fileType}$`, "i");

      if (file.name.match(endsWithFileType)) {
        const extension = new RegExp(`\\.${fileType}$`, "i");
        const fileName = file.name.replace(extension, "");

        if (await no_dupes()) {
          const path = await join(dir, file.name);
          const binary = await readFile(path);
          const buffer: FsFile = {
            fileName,
            fileType,
            binary: new Uint8Array(binary),
          };
          output.push(buffer);
        }
      }
    }
    return output;
  } catch (error) {
    err(error);
    return [];
  }
};

const no_dupes = async (): Promise<boolean> => true;
