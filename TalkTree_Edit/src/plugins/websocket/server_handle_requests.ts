import WebSocket from "@tauri-apps/plugin-websocket";
import { ALL_WORDS, DB } from "../../globals";
import sql_get_key from "../sql/sql_get_key";
import sql_read_uint8array from "../sql/sql_read_unit8array";
import { err } from "../terminal/commands/logs";

const server_handle_request = async (
  message_data: string,
  socket: WebSocket,
): Promise<void> => {
  const argv = message_data.split("|");
  const head = argv[0].toLowerCase();
  const body = argv[1];
  try {
    switch (head) {
      case "request_info":
        body === "audo"
          ? void handle_audio(body, socket)
          : void handle_buttons(body, socket);
        break;
      case "request_update":
        void handle_update(body, socket);
        break;
    }
  } catch (e) {
    err(e);
  }
};

const handle_audio = async (
  table_name: string,
  socket: WebSocket,
): Promise<void> => {
  try {
    const all_keys = ALL_WORDS()
      .map((word) => sql_get_key(word))
      .filter(async (key) => {
        const exists = await sql_read_uint8array(table_name, key);
        if (exists != null) console.log("sending", key);
        return exists !== null;
      })
      .join(",");
    const response = `${table_name},${all_keys}`;
    await socket.send(`sql_info|${response}`);
  } catch (e) {
    err(e);
  }
};

const handle_buttons = async (
  table_name: string,
  socket: WebSocket,
): Promise<void> => {
  const all_keys = (await DB.select<any[]>(`SELECT * FROM ${table_name}`))
    .map((row) => `${row.key}`)
    .join(",");
  const response = `${table_name},${all_keys}`;
  await socket.send(`sql_info|${response}`);
};

const handle_update = async (
  body: string,
  socket: WebSocket,
): Promise<void> => {
  const request_data = body.split("@");
  try {
    const key = `${request_data.shift()}`;
    const table_name = `${request_data.shift()}`;
    const uint8array = await sql_read_uint8array(table_name, key);
    if (uint8array === null) return;
    await socket.send(`sql_update|${table_name},${key},${uint8array}`);
  } catch (e) {
    err(e);
  }
};

export default server_handle_request;
