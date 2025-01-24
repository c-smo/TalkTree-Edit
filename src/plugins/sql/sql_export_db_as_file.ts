import { appDataDir, join } from "@tauri-apps/api/path";
import { copyFile } from "@tauri-apps/plugin-fs";
import { ROOT } from "../../utils/paths";
import { err } from "../terminal/commands/logs";

async function sql_export_db_to_dir() {
  try {
    const appDirectory = await appDataDir();
    const dbPath = await join(appDirectory, "talktree.db");
    const to = await join(ROOT.dir.base, "talktree.db");

    await copyFile(dbPath, to);
  } catch (error) {
    err(error);
  }
}

export default sql_export_db_to_dir;
