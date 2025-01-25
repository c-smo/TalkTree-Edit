import { DB } from "../../globals";
import { sql_string_to_uint8Array } from "../../utils/helpers";
import { err } from "../terminal/commands/logs";

export const sql_read_uint8array = async (
  table_name: string,
  key?: string,
): Promise<Uint8Array | Uint8Array[] | null> => {
  try {
    let query =
      key === undefined
        ? `SELECT * FROM ${table_name}`
        : `SELECT value FROM ${table_name} WHERE key = ?`;

    const result = await DB.select<any[]>(query, [key]);
    if (!result || result.length == 0) return null;

    if (key === undefined)
      return result.map((el) => sql_string_to_uint8Array(el.value));
    else return sql_string_to_uint8Array(result[0].value);
  } catch (error) {
    err(error);
    return null;
  }
};

export default sql_read_uint8array;
