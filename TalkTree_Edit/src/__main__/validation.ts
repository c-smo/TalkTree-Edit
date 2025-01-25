import { join, resolveResource } from "@tauri-apps/api/path";
import { copyFile, exists, mkdir } from "@tauri-apps/plugin-fs";
import dict from "../assets/dictionary.json";
import { TABLE_NAMES } from "../globals";
import API from "../plugins/api/__api_main__";
import { sql_create_uint8array_table } from "../plugins/sql/sql_create_unit8array_table";
import { err } from "../plugins/terminal/commands/logs";
import { ROOT } from "../utils/paths";
import print_colors from "../utils/printer/print_colors";
import print_server from "../utils/printer/print_server";
import print_settings from "../utils/printer/print_settings";

const validate_all = async (): Promise<void> => {
  try {
    await validate_structure();
    await validate_samples();
    await validate_db_tables();
  } catch (error) {
    err(error);
  }
};

export const validate_structure = async (): Promise<void> => {
  try {
    for (let path of Object.values(ROOT.dir)) {
      validate_dir_path(path);
    }
    validate_file_path(ROOT.file.conf, print_settings);
    validate_file_path(ROOT.file.color, print_colors);
    validate_file_path(ROOT.file.api, API.print);
    validate_file_path(ROOT.file.server, print_server);

    if (!(await exists(ROOT.file.xlsx))) {
      const resource_path = await resolveResource("resources/default.xlsx");
      await copyFile(resource_path, ROOT.file.xlsx);
    }
  } catch (error) {
    err(error);
  }
};

const validate_db_tables = async (): Promise<void> => {
  const REFRESH = true;
  //const REFRESH = table_name !== "audio";

  try {
    for (let table_name of TABLE_NAMES) {
      await sql_create_uint8array_table(table_name, REFRESH);
    }
  } catch (error) {
    err(error);
  }
};

const validate_dir_path = async (dir_path: string) => {
  try {
    if (!(await exists(dir_path))) {
      await mkdir(dir_path);
    }
  } catch (error) {
    err(error);
  }
};

const validate_file_path = async (file_path: string, callback: Function) => {
  try {
    if (!(await exists(file_path))) {
      callback();
    }
  } catch (error) {
    err(error);
  }
};

const validate_samples = async () => {
  const audio_files = [
    "808-1",
    "808-2",
    "clap-1",
    "clap-2",
    "hihat-1",
    "hihat-2",
    "hihat-3",
    "kick-1",
    "kick-2",
    "kick-3",
    "snare-1",
    "snare-2",
  ];
  for (const file_name of audio_files) {
    const path = `resources/M-${file_name}.mp3`;
    try {
      const out = await join(ROOT.dir.audio, `M-${file_name}.mp3`);
      if (!(await exists(out))) {
        const resource_path = await resolveResource(path);
        await copyFile(resource_path, out);
      }
    } catch (error) {
      err(error);
    }
  }

  const image_files = ["mom", "dad", "grandma", "grandpa"];
  for (const file_name of image_files) {
    try {
      const key = file_name as keyof typeof dict.samples;
      const out = await join(ROOT.dir.images, `${dict.samples[key]}.png`);
      if (!(await exists(out))) {
        const path = `resources/I-${file_name}.png`;
        const resource_path = await resolveResource(path);
        await copyFile(resource_path, out);
      }
    } catch (error) {
      err(error);
    }
  }
};

export default validate_all;
