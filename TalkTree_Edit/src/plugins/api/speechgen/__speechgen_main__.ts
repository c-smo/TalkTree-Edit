import dict from "../../../assets/dictionary.json" assert { type: "json" };
import print_api from "../../../utils/printer/print_api";
import _speechgen_init_ from "./_speechgen_init_";
import speechgen_fetch_confirm from "./speechgen_fetch_confirm";

const API_SPEECHGEN = {
  expected_file_name: dict.api_speechgen.title,
  confirmation_threshold: 1,
  expected_data: {
    token: "x",
    email: "x",
    voice: "x",
    text: "",
  },
  has_task: false,
  Q: [] as string[],
  init: async () => await _speechgen_init_(),
  fetch: async () => speechgen_fetch_confirm(),
  print: () => print_api(),
};

export const speechgen_get_api = () => {
  return API_SPEECHGEN;
};

export default speechgen_get_api;
