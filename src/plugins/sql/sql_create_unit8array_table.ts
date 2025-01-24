import { DB } from "../../globals";
import { err, log } from "../terminal/commands/logs";

export const sql_create_uint8array_table = async (
  table_name: string,
  refresh: boolean,
): Promise<void> => {
  try {
    const table_exists_result: [] = await DB.select(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='${table_name}'`,
    );

    if (table_exists_result.length === 0 || refresh) {
      if (refresh) {
        log("🔥 Burning old Table 🔥");
        await DB.execute(`DROP TABLE ${table_name}`);
      }
      await DB.execute(
        `CREATE TABLE ${table_name} (
          key TEXT PRIMARY KEY NOT NULL,
          value BLOB NOT NULL
        )`,
      );
    }
  } catch (error) {
    err(error);
  }
};
