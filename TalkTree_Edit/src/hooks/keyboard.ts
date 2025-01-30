import server_init from "../plugins/websocket/_server_init_";
import { GRID } from "../utils/grid";

const keyboard_hooks_init = () => {
  document.body.addEventListener("keydown", async (e) => {
    const map = {
      Enter: async () => {
        await server_init().catch();
      },
      s: () => {
        console.log(GRID);
      },
    };
    const key = e.key as keyof typeof map;
    if (map[key]) map[key]();
  });
};

export default keyboard_hooks_init;
