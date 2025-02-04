import { invoke } from "@tauri-apps/api/core";
import WebSocket from "@tauri-apps/plugin-websocket";
import { set_border_highlight } from "../../_frontend_/ui/border_highlight";
import { SERVER_RUNNING, SET_SERVER_RUNNING, SETTINGS } from "../../globals";
import { msgpackr_encode_settings } from "../../utils/msgpackr";
import print_server from "../../utils/printer/print_server";
import { err } from "../terminal/commands/logs";
import { TERMINAL_IS_VISIBLE } from "../terminal/Terminal";
import server_handle_request from "./server_handle_requests";

const server_init = async () => {
  if (TERMINAL_IS_VISIBLE()) return;

  if (SERVER_RUNNING()) {
    stop_server();
  } else {
    try {
      const local_ip = await start_server();
      if (!local_ip) return;
      SETTINGS.server_ip = local_ip;
      await print_server();
      await update_greeting();
      await connect_handler(local_ip);
      set_border_highlight({
        visible: true,
        spread: 5,
        softness: 12,
      });
      SET_SERVER_RUNNING(true);
    } catch (e) {
      err(e);
      return;
    }
  }
};

const start_server = async (): Promise<string> => {
  try {
    await invoke("start_server");
    const local_ip = await invoke("get_device_ip");
    return `${local_ip}`;
  } catch (e) {
    err(e);
    return "";
  }
};

export const stop_server = async (): Promise<void> => {
  await invoke("stop_server").catch((e) => err(e));
  set_border_highlight({ visible: false });
  SET_SERVER_RUNNING(false);
};

const connect_handler = async (local_ip: string): Promise<void> => {
  try {
    const socket = await WebSocket.connect(`ws://${local_ip}:8080`);
    socket.addListener((msg) => {
      if (msg.data && typeof msg.data === "string") {
        server_handle_request(msg.data, socket);
      }
    });
  } catch (e) {
    err(e);
  }
};

const update_greeting = async (): Promise<void> => {
  const newGlobalString = `greet|${msgpackr_encode_settings(SETTINGS)}`;
  await invoke("set_global_string", { newGlobalString }).catch((e) => err(e));
};

export default server_init;
