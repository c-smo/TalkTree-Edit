import { saveWindowState, StateFlags } from "@tauri-apps/plugin-window-state";
import { Component, onMount } from "solid-js";
import { Cell } from "../_frontend_/components/grid/Grid_Cell";
import { IS_INIT } from "../globals";
import { err } from "../plugins/terminal/commands/logs";
import Terminal from "../plugins/terminal/Terminal";
import { _init_ } from "./_init_";

export const cells: number[] = [];

const App: Component = () => {
  saveWindowState(StateFlags.ALL);

  onMount(async () => {
    await _init_().catch((e) => err(e));
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
