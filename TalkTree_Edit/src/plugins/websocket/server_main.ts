import { invoke } from "@tauri-apps/api/core";
import WebSocket from "@tauri-apps/plugin-websocket";
import { set_border_highlight } from "../../_frontend_/ui/border_highlight";
import {
  IS_INIT,
  SERVER_RUNNING,
  SET_SERVER_RUNNING,
  SET_WS,
  SETTINGS,
  WS,
} from "../../globals";
import { msgpackr_encode_settings } from "../../utils/msgpackr";
import print_server from "../../utils/printer/print_server";
import { err, log } from "../terminal/commands/logs";
import { TERMINAL_IS_VISIBLE } from "../terminal/Terminal";
import server_handle_request, {
  get_all_updates,
} from "./server_handle_requests";

const server_toggle = async () => {
  if (TERMINAL_IS_VISIBLE()) return;
  try {
    SERVER_RUNNING() ? await stop_server() : await start_server();
  } catch (e) {
    err(e);
  }
};

const start_server = async (): Promise<void> => {
  try {
    const local_ip = `${await invoke("get_device_ip")}`;
    if (!local_ip || IS_INIT() === false) return;
    SETTINGS.server_ip = local_ip;
    await invoke("start_server");
    SET_SERVER_RUNNING(true);
    await print_server();
    await update_greeting();
    await connect_handler(local_ip);
    const all_updates = await get_all_updates();
    log(`Available Updates: ${all_updates.length}`);
  } catch (e) {
    err(e);
  }
  server_toggle_indication();
};

export const stop_server = async (): Promise<void> => {
  const socket = WS() as WebSocket;
  socket?.disconnect();
  await invoke("stop_server").catch((e) => err(e));
  SET_WS(null);
  SET_SERVER_RUNNING(false);
  server_toggle_indication();
};

const connect_handler = async (local_ip: string): Promise<void> => {
  try {
    const socket = await WebSocket.connect(`ws://${local_ip}:8080`);
    socket.addListener((msg) => {
      if (msg.data && typeof msg.data === "string") {
        server_handle_request(msg.data, socket);
      }
    });
    SET_WS(socket);
  } catch (e) {
    err(e);
  }
};

const update_greeting = async (): Promise<void> => {
  const newGlobalString = `greet|${msgpackr_encode_settings(SETTINGS)}`;
  await invoke("set_global_string", { newGlobalString }).catch((e) => err(e));
};

const server_toggle_indication = () => {
  set_border_highlight({
    visible: SERVER_RUNNING(),
    spread: 5,
    softness: 12,
  });
};

export default server_toggle;
