import { WorkBook } from "xlsx";
import { SETTINGS } from "../../globals";
import sql_get_key from "../../plugins/sql/sql_get_key";
import { TTSButton } from "../../types/types";
import colors_get from "../colors/colors_get";
import { finalize_button } from "./parse_helpers/finalize_button";
import get_sheet_data from "./parse_helpers/get_json";

const get_buttons_on_sheet = async (
  workbook: WorkBook,
  sheet_name: string,
): Promise<TTSButton[]> => {
  const sheet = workbook.Sheets[sheet_name];
  const sheet_data = get_sheet_data(sheet);
  const all_button_data: TTSButton[] = [];

  const trim = 1;
  const step_size = 5;
  let button_index = 0;
  for (let row = 0; row < sheet_data.length; row += step_size) {
    for (let col = trim; col < SETTINGS.cols + trim; col++) {
      const r = sheet_data[row];
      const c = sheet_data[row][col];
      if (r && c && c !== "empty_cell") {
        const tts_button: TTSButton = {
          sheet_key: sql_get_key(sheet_name),
          symbol: sheet_data[row][col],
          tts: sheet_data[row + 1][col],
          subtitle: sheet_data[row + 2][col],
          color: colors_get(sheet_data[row + 3][col], sheet_data[row + 4][col]),
          link: sheet_data[row + 4][col],
          button_index,
        };
        await finalize_button(tts_button);
        all_button_data.push(tts_button);
      }
      button_index++;
    }
  }
  return all_button_data as TTSButton[];
};

export default get_buttons_on_sheet;
