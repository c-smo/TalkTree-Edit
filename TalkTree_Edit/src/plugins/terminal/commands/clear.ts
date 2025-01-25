import { get_prefix } from "../Terminal";
import { set_messages } from "./logs";

const clear = (_?: any) => {
  set_messages([{ type: "log", content: `${get_prefix()} clear` }]);
};

export default clear;
