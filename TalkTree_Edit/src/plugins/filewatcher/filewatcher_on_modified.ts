import { relaunch } from "@tauri-apps/plugin-process";
import { validate_structure } from "../../__main__/validation";
import process_xlsx from "../../_backend_/process/process_xlsx";
import frontend_update from "../../_frontend_/__frontend_main__/frontend_update";
import { set_border_highlight } from "../../_frontend_/ui/border_highlight";
import { sleep } from "../../utils/helpers";
import { ROOT } from "../../utils/paths";
import API from "../api/__api_main__";
import sql_upsert_wrapper_array from "../sql/sql_upsert_wrapper_array";
import { err } from "../terminal/commands/logs";

type FileHandler = () => Promise<void>;

export const filewatcher_on_modified = async (path: string) => {
  await validate_structure();
  const fileHandlerMap: Record<string, FileHandler> = {
    [ROOT.file.xlsx]: handle_xlsx,
    [ROOT.file.color]: handle_color,
    [ROOT.file.conf]: handle_config,
    [ROOT.file.api]: handle_api,
    [ROOT.dir.images]: handle_images,
  };

  try {
    await set_border_highlight({
      visible: true,
      spread: 2,
      color: "rgba(255,255,255,0.2)",
    });
    await sleep(50);

    await fileHandlerMap[path]();

    await set_border_highlight({ visible: false });
  } catch (error) {
    err(error);
  }
};

const handle_xlsx: FileHandler = async () => {
  await refresh_buttons();
  await handle_api();
};

const handle_color: FileHandler = async () => {
  await refresh_buttons();
};

const handle_config: FileHandler = async () => {
  await relaunch();
};

const handle_images: FileHandler = async () => {
  await refresh_buttons();
};

const handle_api = async () => {
  await API.init();
  void API.fetch();
};

const refresh_buttons = async () => {
  const wrapped_xlsx = await process_xlsx();
  await sql_upsert_wrapper_array(wrapped_xlsx);
  await frontend_update();
};

export default filewatcher_on_modified;
