import { join, resolveResource, resourceDir } from "@tauri-apps/api/path";
import {
  exists,
  mkdir,
  readDir,
  readFile,
  writeFile,
} from "@tauri-apps/plugin-fs";
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
    await validate_images();
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
      const binary = await readFile(resource_path);
      await writeFile(ROOT.file.xlsx, binary);
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

const copy_files = async (src_dir: string, out_dir: string): Promise<void> => {
  const all_entries = await readDir(src_dir);
  for (const entry of all_entries) {
    try {
      const resource_path = await join(src_dir, entry.name);
      const out_path = await join(out_dir, entry.name);
      if ((await exists(out_path)) === false) {
        const binary = await readFile(resource_path);
        await writeFile(out_path, binary);
      }
    } catch (error) {
      err(error);
    }
  }
};

const validate_samples = async () => {
  try {
    const src_dir = await join(await resourceDir(), "resources", "audio");
    copy_files(src_dir, ROOT.dir.audio);
  } catch (e) {
    err(e);
  }
};

const validate_images = async (): Promise<void> => {
  const image_files = ["mom", "dad", "grandma", "grandpa"];
  for (const file_name of image_files) {
    try {
      const key = file_name as keyof typeof dict.samples;
      const out = await join(ROOT.dir.images, `${dict.samples[key]}.png`);
      if ((await exists(out)) === false) {
        const path = `resources/I-${file_name}.png`;
        const resource_path = await resolveResource(path);
        const binary = await readFile(resource_path);
        await writeFile(out, binary);
      }
    } catch (error) {
      err(error);
    }
  }
};

export default validate_all;
