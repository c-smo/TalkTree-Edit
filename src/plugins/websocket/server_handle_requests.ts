import WebSocket from "@tauri-apps/plugin-websocket";
import { sql_get_info_of_table } from "../sql/sql_get_info_of_table";
import sql_read_uint8array from "../sql/sql_read_unit8array";
import { err, log } from "../terminal/commands/logs";

const server_handle_request = async (
  message_data: string,
  socket: WebSocket,
): Promise<void> => {
  const argv = message_data.split("|");
  const head = argv[0].toLowerCase();
  const body = argv[1];
  if (head === "request_info") {
    handle_request_info(body, socket);
  } else if (head === "request_update") {
    handle_request_update(body, socket);
  }
};

const handle_request_info = async (body: string, socket: WebSocket) => {
  try {
    const response = await sql_get_info_of_table(body);
    await socket.send(`sql_info|${response}`);
  } catch (error) {
    err(error);
  }
};

const handle_request_update = async (body: string, socket: WebSocket) => {
  try {
    const key = body.split("@")[0];
    const table_name = body.split("@")[1];

    const uint8array = (await sql_read_uint8array(
      table_name,
      key,
    )) as Uint8Array;
    await socket.send(`sql_update|${table_name},${key},${uint8array}`);
    log(`send:${key}@${table_name} ${String(uint8array).slice(0, 5)}`);
  } catch (error) {
    err(error);
  }
};

export default server_handle_request;
