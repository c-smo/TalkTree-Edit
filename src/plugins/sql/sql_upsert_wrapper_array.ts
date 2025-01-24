import { SqlWrapper } from "../../types/types";
import { sql_upsert_uint8array } from "./sql_upsert_unit8array";

const sql_upsert_wrapper_array = async (
  sql_wrapper_array: SqlWrapper[],
): Promise<void> => {
  for (const sql_wrapper of sql_wrapper_array) {
    await sql_upsert_uint8array(sql_wrapper);
  }
};

export default sql_upsert_wrapper_array;
