import { stat } from "@tauri-apps/plugin-fs";
import { ROOT } from "../../utils/paths";
import API from "../api/__api_main__";
import { filewatcher_on_modified } from "./filewatcher_on_modified";

const FILE_WATCHER = {
  target_paths: [] as string[],
  delay: 200,
  current_intervall: 0,
  init: async () => {
    FILE_WATCHER.target_paths.push(
      ROOT.file.xlsx,
      ROOT.file.conf,
      ROOT.file.color,
      ROOT.file.api,
      ROOT.dir.images,
    );

    const last_modified_time: Record<string, number> = {};
    for (const path of FILE_WATCHER.target_paths) {
      const stat_result = await stat(path);
      if (!stat_result.mtime) continue;
      last_modified_time[path] = stat_result.mtime.getTime();
    }

    FILE_WATCHER.current_intervall = setInterval(async () => {
      if (!API.Q.length) {
        for (const path of FILE_WATCHER.target_paths) {
          const stat_result = await stat(path);
          if (!stat_result.mtime) continue;

          const currentModifiedTime = stat_result.mtime.getTime();
          if (last_modified_time[path] !== currentModifiedTime) {
            filewatcher_on_modified(path);
          }
          last_modified_time[path] = currentModifiedTime;
        }
      }
    }, FILE_WATCHER.delay);
  },
};

export default FILE_WATCHER;
