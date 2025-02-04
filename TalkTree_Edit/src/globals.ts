import Database from "@tauri-apps/plugin-sql";
import { createSignal } from "solid-js";
import { Settings, SettingsWrapper, TTSButton } from "./types/types";
import { set_css_global } from "./utils/helpers";

export const TABLE_NAMES = ["buttons", "audio", "settings"] as const;

export const [WS, SET_WS] = createSignal();

export const [CURRENT_SHEET, SET_CURRENT_SHEET] = createSignal("home");

export const [NEW_WORDS, SET_NEW_WORDS] = createSignal([] as string[]);

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
  emoji_size: 0.7,
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
  set_css_global("--global-emoji-size", `${100 * SETTINGS.emoji_size}%`);
};

export const globals_init_db = async (): Promise<void> => {
  DB = await Database.load("sqlite:talktree.db");
};
