import { join } from "@tauri-apps/api/path";
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { saveWindowState, StateFlags } from "@tauri-apps/plugin-window-state";
import { Component, createEffect } from "solid-js";
import { Cell } from "../_frontend_/components/grid/Grid_Cell";
import { IS_INIT } from "../globals";
import { err } from "../plugins/terminal/commands/logs";
import Terminal from "../plugins/terminal/Terminal";
import { ROOT } from "../utils/paths";
import { _init_ } from "./_init_";

export const cells: number[] = [];

const App: Component = () => {
  saveWindowState(StateFlags.ALL);

  createEffect(() => {
    const run_init_ = async () => {
      try {
        await _init_();
      } catch (error) {
        err(`_init_${error}`);
        const path = await join(ROOT.dir.desktop, "error.log");
        await writeTextFile(path, String(error));
      }
    };
    run_init_();
  });

  return (
    <div>
      <Terminal />
      <div class="grid-container">
        {IS_INIT() && (
          <>
            {cells.map((i) => (
              <Cell index={i} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
