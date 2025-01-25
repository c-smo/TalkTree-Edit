import { DB } from "../../globals";
import { SqlWrapper } from "../../types/types";
import { err } from "../terminal/commands/logs";
import sql_read_uint8array from "./sql_read_unit8array";

export const sql_upsert_uint8array = async (
  sql_wrapper: SqlWrapper,
): Promise<void> => {
  const w = sql_wrapper;
  try {
    const existingValue = await sql_read_uint8array(w.table_name, w.key);
    if (existingValue) {
      await DB.execute(`UPDATE ${w.table_name} SET value = ? WHERE key = ?`, [
        w.value,
        w.key,
      ]);
    } else {
      await DB.execute(
        `INSERT INTO ${w.table_name} (key, value) VALUES (?, ?)`,
        [w.key, w.value],
      );
    }
  } catch (error) {
    err(error);
  }
};
