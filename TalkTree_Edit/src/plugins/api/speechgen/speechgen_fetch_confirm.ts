import { confirm } from "@tauri-apps/plugin-dialog";
import dictionary from "../../../assets/dictionary.json";
import { NEW_WORDS } from "../../../globals";
import API from "../__api_main__";
import speechgen_fetch from "./speechgen_fetch";
import speechgen_valid_data from "./speechgen_valid_data";

const speechgen_fetch_confirm = async () => {
  if (!speechgen_valid_data()) return;

  if (NEW_WORDS().length > API.confirmation_threshold) {
    const dict = dictionary.api_speechgen.prompt.confirmation;
    const title = dict.title;
    const text = dict.text.replace(/\$/, `${NEW_WORDS().length}`);
    const confirmation = await confirm(text, { title });
    if (confirmation) {
      speechgen_fetch();
    }
  } else if (NEW_WORDS().length) {
    speechgen_fetch();
  }
};

export default speechgen_fetch_confirm;
