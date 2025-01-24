import sql_get_key from "../../../plugins/sql/sql_get_key";
import sql_read_uint8array from "../../../plugins/sql/sql_read_unit8array";
import { err } from "../../../plugins/terminal/commands/logs";
import { TTSButton } from "../../../types/types";
import { uint8array_to_base64 } from "../../../utils/helpers";
import handle_new_word from "./add_new_word";

export const finalize_button = async (tts_button: TTSButton): Promise<void> => {
  finalize_tts(tts_button);
  finalize_link(tts_button);
  await finalize_symbol(tts_button);
};

const finalize_tts = (tts_button: TTSButton) => {
  if (tts_button.tts === "empty_cell") {
    tts_button.tts = tts_button.symbol;
  }
  handle_new_word(tts_button.tts);
};

const finalize_link = (tts_button: TTSButton) => {
  if (tts_button.link === "empty_cell") {
    tts_button.link = "home";
  }
};

const finalize_symbol = async (tts_button: TTSButton): Promise<void> => {
  try {
    const key = sql_get_key(tts_button.symbol);
    const uint8Array = (await sql_read_uint8array("images", key)) as Uint8Array;
    if (uint8Array) {
      tts_button.symbol = uint8array_to_base64(uint8Array);
    }
  } catch (error) {
    err(error);
  }
};
