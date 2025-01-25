// import { err } from "../../terminal/commands/logs";
// import { WS } from "./client_connect";
// import { SqlWrapper, websocket_request } from "./client_helpers";

// const handle_response = (server_response: string) => {
//   const map = {
//     sql_info: handle_info,
//     sql_update: handle_update,
//   };

//   const argv = server_response.split("|");
//   const head = argv[0].toLowerCase() as keyof typeof map;
//   const body = argv.slice(1).join("");

//   if (Object.keys(map).includes(head)) {
//     map[head](body);
//   }
// };

// let isIdle = false;

// const handle_info = async (info: string) => {
//   try {
//     const socket = WS();
//     if (socket === null) {
//       err(socket);
//       return;
//     }
//     isIdle = false;
//     const allKeys = info.split(",") as string[];
//     const table_name = allKeys.shift() as string;
//     for (let key of allKeys) {
//       await websocket_request("update", `${key}@${table_name}`);
//     }
//   } catch (error) {
//     err(error);
//   }
//   isIdle = true;
// };

// const handle_update = async (update: string) => {
//   const data = update.split(",");
//   const wrapper: SqlWrapper = {
//     table_name: `${data.shift()}`,
//     key: `${data.shift()}`,
//     value: new Uint8Array(data.map(Number)),
//   };
//   //sql_upsert_uint8array(wrapper)
//   console.log("update", wrapper);
// };

// export default handle_response;
