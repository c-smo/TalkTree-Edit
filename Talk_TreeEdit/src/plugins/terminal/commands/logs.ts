import { createSignal } from "solid-js";
import { get_prefix } from "../Terminal";
import { Terminal_DumpMap, TerminalLog } from "../terminal_types";

export const [messages, set_messages] = createSignal([] as TerminalLog[]);

const error_store = [] as string[];
const log_store = [] as string[];

export const log = (content: string, type: string = "log") => {
  const msg = {
    type,
    content: `${get_prefix()} ${content}`,
  };
  set_messages([...messages(), msg]);
  if (type != "Terminal") log_store.push(content);
};

export const err = (error_message: any) => {
  log(error_message, "Terminal");
  error_store.push(`${error_message}`);
};

export const dump = (store: string, amount: string | number = 10) => {
  const key = store as keyof Terminal_DumpMap;
  const map = {
    log: log_store,
    err: error_store,
  } as Terminal_DumpMap;
  log(`${map[key]} dump ${amount}`);
  if (map[key]) {
    const arr = map[key].slice(-Number(amount));
    const unique = [...new Set(arr)];
    for (let e of unique) {
      store === "log" ? log(e) : err(e);
    }
  }
};
