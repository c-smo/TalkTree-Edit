export type Grid = {
  rows: number;
  cols: number;
  cell_width: number;
  cell_height: number;
  margin: number;
};

export type FsFile = {
  fileName: string;
  fileType: string;
  binary: Uint8Array;
  text?: string;
};

export type BorderPulseProps = {
  color: string;
  spread: number;
  softness: number;
  duration: number;
};

export type BorderHightlightProps = {
  color: string;
  spread: number;
  softness: number;
  visible: boolean;
};

export type TTSButton = {
  sheet_key: string;
  symbol: string;
  tts: string;
  subtitle: string;
  color: string;
  link: string;
  button_index: number;
  is_emoji: boolean;
};

export type Settings = {
  rows: number;
  cols: number;
  aspect_ratio: string;
  radius: number;
  use_swipe: boolean;
  emoji_size: number;
  server_ip: string;
  default_colors: {
    background: string;
    button: string;
    text: string;
  };
};

export type SettingsWrapper = {
  cols: number;
  rows: number;
  radius: number;
  aspect_ratio: string;
  use_swipe: boolean;
  emoji_size: number;
};

export type SqlWrapper = {
  table_name: string;
  key: string;
  value: Uint8Array;
  file_name?: string;
};
