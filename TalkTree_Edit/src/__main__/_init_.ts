import _backend_init_ from "../_backend_/_backend_init_/_backend_init_";
import _frontend_init_ from "../_frontend_/__frontend_main__/_fontend_init_";
import { globals_init_db, SET_IS_INIT } from "../globals";
import keyboard_hooks_init from "../hooks/keyboard";
import FILE_WATCHER from "../plugins/filewatcher/filewatcher";
import { err } from "../plugins/terminal/commands/logs";
import { paths_init } from "../utils/paths";
import print_new_words from "../utils/printer/print_new_words";
import { resize_window } from "../utils/resize_window";
import validate_all from "./validation";

export const _init_ = async (): Promise<void> => {
  console.clear();
  keyboard_hooks_init();

  try {
    await paths_init();
    await globals_init_db();
    await validate_all();

    await _backend_init_();
    await resize_window();
    await _frontend_init_();

    await FILE_WATCHER.init();
    await print_new_words();
    SET_IS_INIT(true); // --> __main__.tsx
  } catch (error) {
    err(error);
  }
};
