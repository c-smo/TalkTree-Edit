import { CURRENT_SHEET, SET_CURRENT_PROPS, SETTINGS } from "../../globals";
import sql_get_key from "../../plugins/sql/sql_get_key";
import sql_read_uint8array from "../../plugins/sql/sql_read_unit8array";
import { err } from "../../plugins/terminal/commands/logs";
import { TTSButton } from "../../types/types";
import { msgpackr_decode_tts_button } from "../../utils/msgpackr";

const frontend_update = async () => {
  try {
    const key = sql_get_key(CURRENT_SHEET());
    const uint8array = (await sql_read_uint8array(
      "buttons",
      key,
    )) as Uint8Array;

    const buffer_array = get_ghost_array();
    if (uint8array) {
      msgpackr_decode_tts_button(uint8array).map((button) => {
        buffer_array[button.button_index] = button;
      });
    }
    console.log(buffer_array);
    SET_CURRENT_PROPS([...buffer_array]);
  } catch (error) {
    err(error);
  }
};

const get_ghost_array = (): TTSButton[] => {
  return new Array(SETTINGS.cols * SETTINGS.rows)
    .fill("")
    .map(() => get_ghost_button());
};

const get_ghost_button = (): TTSButton => {
  return {
    sheet_key: "-",
    symbol: "-",
    tts: "-",
    subtitle: "-",
    color: "-",
    link: "-",
    button_index: 0,
  };
};

export default frontend_update;
