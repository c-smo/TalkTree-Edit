import { join, resourceDir } from "@tauri-apps/api/path";
import { exists, readFile } from "@tauri-apps/plugin-fs";
import { err } from "../../../plugins/terminal/commands/logs";
import { TTSButton } from "../../../types/types";
import { uint8array_to_base64 } from "../../../utils/helpers";
import { ROOT } from "../../../utils/paths";
import convert_jpg_to_png from "../../process/process_helpers/convert_jpg_to_png";
import handle_new_word from "./handle_new_word";

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
    const emoji_path = await get_noto_emoji_path(tts_button.symbol);
    const image_path = await join(
      ROOT.dir.images,
      ...tts_button.symbol.split("/"),
    );
    let uint8Array = null;
    if (emoji_path != "") {
      uint8Array = await readFile(emoji_path);
      tts_button.is_emoji = true;
    } else if (await exists(`${image_path}.png`)) {
      uint8Array = await readFile(`${image_path}.png`);
    } else if (await exists(`${image_path}.jpg`)) {
      const jpg = await readFile(`${image_path}.jpg`);
      uint8Array = await convert_jpg_to_png(jpg);
    } else if (await exists(`${image_path}.jpeg`)) {
      const jpeg = await readFile(`${image_path}.jpeg`);
      uint8Array = await convert_jpg_to_png(jpeg);
    }
    if (uint8Array) {
      tts_button.symbol = uint8array_to_base64(uint8Array);
    }
  } catch (error) {
    err(error);
  }
};

const get_noto_emoji_path = async (symbol: string): Promise<string> => {
  const codePoint = symbol.codePointAt(0)?.toString(16) ?? "";
  if (!codePoint) return "";
  const file_name = `emoji_u${codePoint}.png`;

  const path = await join(
    await resourceDir(),
    "resources",
    "noto-emoji",
    file_name,
  );
  if (await exists(path)) {
    return path;
  } else {
    return "";
  }
};
