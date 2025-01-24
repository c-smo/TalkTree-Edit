import { decode, encode } from "msgpackr";
import { Settings, TTSButton } from "../types/types";

export const msgpackr_encode_tts_button = (data: TTSButton[]): Uint8Array => {
  return encode(data);
};

export const msgpackr_decode_tts_button = (
  encoded_data: Uint8Array,
): TTSButton[] => {
  return decode(encoded_data) as TTSButton[];
};

export const msgpackr_encode_settings = (settings: Settings): Uint8Array => {
  return encode(settings);
};

export const msgpackr_decode_settings = (
  encoded_data: Uint8Array,
): Settings => {
  return decode(encoded_data) as Settings;
};
