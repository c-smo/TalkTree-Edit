// import { err, log } from "../../terminal/commands/logs";
// import { WS } from "./client_connect";

// export const send_to_sql = async (wrapper: SqlWrapper) => {
//   log(`nice 😎`);
//   log(`${wrapper.key}@${wrapper.table_name}=${wrapper.value.splice(0, 5)}`);
// };

// export type SqlWrapper = {
//   table_name: string;
//   key: string;
//   value: any;
//   file_name?: string;
// };

// export const update_to_wrapper = (update: string): SqlWrapper => {
//   const argv = update.split("|");
//   return {
//     table_name: argv[1].split("@")[0],
//     key: argv[1].split("@")[1],
//     value: argv[2],
//   };
// };

// export const websocket_request = async (
//   tag: string,
//   content?: string,
// ): Promise<void> => {
//   const socket = WS();
//   if (socket === null) {
//     err(socket);
//     return;
//   }
//   log(`request_${tag}|${content}`);
//   await socket.send(`request_${tag}|${content}`);
// };
