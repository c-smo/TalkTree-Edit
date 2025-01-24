import sql_get_key from "../../plugins/sql/sql_get_key";
import sql_read_uint8array from "../../plugins/sql/sql_read_unit8array";
import { err } from "../../plugins/terminal/commands/logs";
import { TTSButton } from "../../types/types";

export const tts_read = async (button: TTSButton): Promise<void> => {
  if (button.tts === "-") return;
  try {
    const key = sql_get_key(button.tts);

    const uint8array = (await sql_read_uint8array("audio", key)) as Uint8Array;
    if (uint8array) {
      tts_from_sql(uint8array);
    } else {
      tts_os_internal(button.tts);
    }
  } catch (e) {
    err(e);
  }
};

const tts_from_sql = async (uint8array: Uint8Array) => {
  const blob = new Blob([uint8array], { type: "audio/mp3" });
  const audioUrl = URL.createObjectURL(blob);
  try {
    await new Audio(audioUrl).play();
  } catch (error) {
    err(error);
  }
};

const tts_os_internal = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.pitch = 1;
  utterance.rate = 1;
  window.speechSynthesis.speak(utterance);
};
