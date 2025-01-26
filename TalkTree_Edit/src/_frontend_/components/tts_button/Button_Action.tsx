import { CURRENT_PROPS, SET_CURRENT_SHEET } from "../../../globals";
import { err } from "../../../plugins/terminal/commands/logs";
import { TTSButton } from "../../../types/types";
import { sleep } from "../../../utils/helpers";
import frontend_update from "../../__frontend_main__/frontend_update";
import { tts_read } from "../../tts/tts";

export const CLICK_DELAY_MS = 150;

export const click_action = async (
  index: number,
  set_is_clicked: (b: boolean) => void,
) => {
  set_is_clicked(true);
  await sleep(CLICK_DELAY_MS);
  set_is_clicked(false);
  trigger_action(index);
};

export const trigger_action = async (index: number) => {
  const tts_button: TTSButton = CURRENT_PROPS()[index];
  try {
    await tts_read(tts_button);
    //await tts(data.pronunciation || data.symbol);
  } catch (error) {
    err(error);
  }
  SET_CURRENT_SHEET(tts_button.link);
  frontend_update();
};
