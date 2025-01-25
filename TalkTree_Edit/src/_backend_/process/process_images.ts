import { SqlWrapper } from "../../types/types";
import { ROOT } from "../../utils/paths";
import jpg_arr_to_png from "./process_helpers/convert_jpg_to_png";
import { process_dir } from "./process_helpers/process_dir";

const process_images = async (): Promise<SqlWrapper[]> => {
  const output = [];
  const file_types = ["png", "jpg", "jpeg"];
  for (const type of file_types) {
    const wrappers = await process_dir(ROOT.dir.images, type, "images");
    if (type === "png") {
      output.push(...wrappers);
    } else {
      output.push(...(await jpg_arr_to_png(wrappers)));
    }
  }

  return output;
};

export default process_images;
