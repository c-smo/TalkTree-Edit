import dict from "../../assets/dictionary.json";
import { globals_init_settings } from "../../globals";
import { ROOT } from "../../utils/paths";
import { fs_read_file_without_extension } from "../fs/fs_read_file";

export type SettingsWrapper = {
  cols: number;
  rows: number;
  radius: number;
  aspect_ratio: string;
  use_swipe: boolean;
  emoji_size: number;
};

const process_settings = async (): Promise<void> => {
  const file = await fs_read_file_without_extension(
    dict.settings.fileName,
    ROOT.dir.conf,
  );
  if (!file || !file.text) return;

  const lines_array = file.text.split("\n");
  if (!lines_array) return;

  const values = lines_array.map((el) => el.split(" ").pop());
  const defined_values = values
    ?.filter((el) => el != undefined)
    .map((el) => el.trim());

  if (defined_values.length < 6) return;

  const wrapper: SettingsWrapper = {
    rows: Number(defined_values[0]),
    cols: Number(defined_values[1]),
    aspect_ratio: defined_values[2],
    radius: parseFloat(defined_values[3]),
    use_swipe: parse_boolean(defined_values[4]),
    emoji_size: Number(defined_values[5]),
  };
  globals_init_settings(wrapper);
};

const parse_boolean = (defined_value: string) => {
  return defined_value.toLowerCase() === dict.misc.boolean_true.toLowerCase();
};

export default process_settings;
