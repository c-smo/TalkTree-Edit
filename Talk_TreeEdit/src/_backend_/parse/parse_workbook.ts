import { WorkBook } from "xlsx";
import sql_get_key from "../../plugins/sql/sql_get_key";
import { err } from "../../plugins/terminal/commands/logs";
import { SqlWrapper } from "../../types/types";
import { msgpackr_encode_tts_button } from "../../utils/msgpackr";
import get_buttons_on_sheet from "./parse_buttons";

const parse_workbook = async (workbook: WorkBook): Promise<SqlWrapper[]> => {
  const output = [] as SqlWrapper[];
  for (const sheetName of workbook.SheetNames) {
    try {
      const data = await get_buttons_on_sheet(workbook, sheetName);
      output.push({
        table_name: "buttons",
        key: sql_get_key(sheetName),
        value: msgpackr_encode_tts_button(data),
      });
    } catch (error) {
      err(error);
    }
  }
  return output;
};

export default parse_workbook;
