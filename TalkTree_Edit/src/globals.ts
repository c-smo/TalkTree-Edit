import Database from "@tauri-apps/plugin-sql";
import { createSignal } from "solid-js";
import { SettingsWrapper } from "./_backend_/process/process_settings";
import { Settings, TTSButton } from "./types/types";

export const TABLE_NAMES = ["buttons", "images", "audio", "settings"] as const;

//TODO
export let CURRENT_SHEET = "home";

export const set_current_sheet = (link: string) => {
  CURRENT_SHEET = link;
};

/**
 * used to send audio to client, in case db holds more words than needed
 */
export const [ALL_WORDS, SET_ALL_WORDS] = createSignal([] as string[]);

export const [IS_INIT, SET_IS_INIT] = createSignal(false);

export const [CURRENT_PROPS, SET_CURRENT_PROPS] = createSignal(
  [] as TTSButton[],
);

export const [SERVER_RUNNING, SET_SERVER_RUNNING] = createSignal(false);

export let DB: Database;

export const SETTINGS: Settings = {
  rows: 6,
  cols: 3,
  aspect_ratio: "9:18",
  radius: 0.2,
  use_swipe: false,
  server_ip: "-",
  default_colors: {
    background: "#2c3e50",
    button: "#3498db",
    text: "#FFFFFF",
  },
};

export const globals_init_settings = async (
  wrapper: SettingsWrapper,
): Promise<void> => {
  Object.assign(SETTINGS, { ...wrapper });
};

export const NEW_WORDS: string[] = [];

export const globals_clear_new_words = () => {
  while (NEW_WORDS.length) {
    NEW_WORDS.shift();
  }
};

export const globals_init_db = async (): Promise<void> => {
  DB = await Database.load("sqlite:talktree.db");
};
