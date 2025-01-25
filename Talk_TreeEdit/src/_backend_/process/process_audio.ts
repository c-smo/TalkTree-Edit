import { SqlWrapper } from "../../types/types";
import { ROOT } from "../../utils/paths";
import { process_dir } from "./process_helpers/process_dir";

const process_audio = async (): Promise<SqlWrapper[]> => {
  return await process_dir(ROOT.dir.audio, "mp3", "audio");
};

export default process_audio;
