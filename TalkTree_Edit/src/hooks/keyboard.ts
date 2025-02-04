import server_toggle from "../plugins/websocket/server_main";

const keyboard_hooks_init = () => {
  document.body.addEventListener("keydown", async (e) => {
    const map = {
      Enter: async () => {
        await server_toggle().catch();
      },
    };
    const key = e.key as keyof typeof map;
    if (map[key]) map[key]();
  });
};

export default keyboard_hooks_init;
