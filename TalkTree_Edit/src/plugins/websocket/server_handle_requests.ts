import WebSocket from "@tauri-apps/plugin-websocket";
import { set_border_highlight } from "../../_frontend_/ui/border_highlight";
import { ALL_WORDS, DB, SET_TOTAL_UPDATES, TOTAL_UPDATES } from "../../globals";
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
        SET_TOTAL_UPDATES(TOTAL_UPDATES() + 1);

        const response =
          body === "audio" ? await handle_audio() : await handle_buttons();

        await socket.send(`sql_info|audio,${response.join(",")}`);
        return;
      case "request_update":
        await handle_update(body, socket);
        return;
      case "request_total":
        await handle_total(socket);
        return;
      case "request_fin":
        return;
    }
  } catch (e) {
    err(e);
  }
};

const handle_audio = async (): Promise<string[]> => {
  try {
    const all_keys = ALL_WORDS().map((word) => sql_get_key(word)) as string[];

    const all_keys_with_audio = (await Promise.all(
      all_keys.map(async (key) => {
        const exists = await sql_read_uint8array("audio", key);
        return exists !== null ? key : null;
      }),
    )) as string[];
    return all_keys_with_audio;
  } catch (e) {
    err(e);
    return [];
  }
};

const handle_buttons = async (): Promise<string[]> => {
  try {
    const all_keys = (await DB.select<any[]>(`SELECT key FROM buttons`)).map(
      (row) => row.key,
    );

    return all_keys;
  } catch (e) {
    err(e);
    return [];
  }
};

const handle_total = async (socket: WebSocket): Promise<void> => {
  const audio_update_length = await handle_audio();
  const buttons_update_length = await handle_buttons();
  const total = audio_update_length.length + buttons_update_length.length;
  await socket.send(`sql_total|${total}`);
};

const handle_update = async (
  body: string,
  socket: WebSocket,
): Promise<void> => {
  const request_data = body.split("@");
  set_border_highlight({ visible: true, color: "#b1fac5" });
  SET_TOTAL_UPDATES(TOTAL_UPDATES() - 1);

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
