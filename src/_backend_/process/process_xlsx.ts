import { readFile } from "@tauri-apps/plugin-fs";
import { read, WorkBook } from "xlsx";
import { SqlWrapper } from "../../types/types";
import { ROOT } from "../../utils/paths";
import parse_workbook from "../parse/parse_workbook";

const process_xlsx = async (): Promise<SqlWrapper[]> => {
  const xlsx_binary = await readFile(ROOT.file.xlsx);
  const workbook: WorkBook = read(xlsx_binary);
  const parsed_workbook = await parse_workbook(workbook);
  return parsed_workbook;
};

export default process_xlsx;
