import { fs_read_file_without_extension } from "../../../_backend_/fs/fs_read_file";
import { ROOT } from "../../../utils/paths";
import { err } from "../../terminal/commands/logs";
import API from "../__api_main__";

const _speechgen_init_ = async (): Promise<boolean> => {
  try {
    const data = await read_api_data();

    if (data) {
      API.expected_data.token = data[0];
      API.expected_data.email = data[1];
      API.expected_data.voice = data[2];
      return true;
    }
  } catch (error) {
    err(error);
  }
  return false;
};

const read_api_data = async (): Promise<string[] | null> => {
  const file = await fs_read_file_without_extension(
    API.expected_file_name,
    ROOT.dir.conf,
  );

  if (!file || !file.text) return null;
  return parse(file.text);
};

const parse = (file_text: string) => {
  return file_text
    .split("\n")
    .map((line) => line.split(":").pop())
    .filter((el) => el != undefined)
    .map((el) => el.trim());
};

export default _speechgen_init_;
