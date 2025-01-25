// import WebSocket from "@tauri-apps/plugin-websocket";
// import { createSignal } from "solid-js";
// import { err, log } from "../../terminal/commands/logs";
// import handle_response from "./client_handle_response";

// export const [WS, SET_WS] = createSignal<WebSocket | null>(null);

// export const client_connect = async (ip: string) => {
//   try {
//     const url = `ws://${ip}`;
//     const socket = await WebSocket.connect(url);

//     socket.addListener((msg) => {
//       if (msg.data && typeof msg.data === "string") {
//         handle_response(msg.data);
//       }
//     });

//     SET_WS(socket);
//     log(`Connected to ${ip}`);
//   } catch (error) {
//     err(error);
//   }
// };

// export default client_connect;
