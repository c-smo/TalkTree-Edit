import WebSocket from "@tauri-apps/plugin-websocket";
import { ALL_WORDS, DB } from "../../globals";
import sql_get_key from "../sql/sql_get_key";
import sql_read_uint8array from "../sql/sql_read_unit8array";
import { err } from "../terminal/commands/logs";
import { stop_server } from "./server_main";

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
        const response = await get_all_updates();
        await socket.send(`sql_total|${response.join(",")}`);
        return;
      case "request_update":
        await handle_update(body, socket);
        return;
      case "request_fin":
        await stop_server();
        return;
    }
  } catch (e) {
    err(e);
  }
};

export const get_all_updates = async (): Promise<string[]> => {
  const audio_update = await handle_audio();
  const buttons_update = await handle_buttons();
  const all_updates = [...audio_update, ...buttons_update];
  return all_updates;
};

const handle_audio = async (): Promise<string[]> => {
  try {
    const all_keys = ALL_WORDS().map((word) => sql_get_key(word)) as string[];

    const all_keys_with_audio = (await Promise.all(
      all_keys.map(async (key) => {
        const exists = await sql_read_uint8array("audio", key);
        return exists !== null ? `a-${key}` : null;
      }),
    )) as string[];

    return all_keys_with_audio.filter((el) => el != null);
  } catch (e) {
    err(e);
    return [];
  }
};

const handle_buttons = async (): Promise<string[]> => {
  try {
    const all_keys = (await DB.select<any[]>(`SELECT key FROM buttons`)).map(
      (row) => `b-${row.key}`,
    );

    return all_keys;
  } catch (e) {
    err(e);
    return [];
  }
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
    if (uint8array !== null) {
      await socket.send(`sql_update|${table_name},${key},${uint8array}`);
    } else {
      const error_msg = `sql_err_no_binary-${key}@${table_name}`;
      await socket.send(`sql_update|error,${error_msg}}`);
      err(error_msg);
    }
  } catch (e) {
    err(e);
  }
};

export default server_handle_request;
