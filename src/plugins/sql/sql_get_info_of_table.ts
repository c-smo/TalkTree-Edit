import { DB } from "../../globals";
import { err } from "../terminal/commands/logs";

export const sql_get_info_of_table = async (
  table_name: string,
): Promise<string> => {
  const allData = [table_name] as string[];
  try {
    const rows = await DB.select<any[]>(`SELECT * FROM ${table_name}`);

    for (const row of rows) {
      allData.push(`${row.key}`);
    }
    return allData.join(",");
  } catch (error) {
    err(error);
    return "error";
  }
};
