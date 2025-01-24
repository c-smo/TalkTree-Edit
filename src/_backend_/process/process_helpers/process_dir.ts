import sql_get_key from "../../../plugins/sql/sql_get_key";
import { SqlWrapper } from "../../../types/types";
import { fs_read_dir } from "../../fs/fs_read_dir";

export const process_dir = async (
  dir: string,
  file_type: string,
  table_name: string,
): Promise<SqlWrapper[]> => {
  const output: SqlWrapper[] = [];
  const allFiles = await fs_read_dir(dir, file_type);

  for (let file of allFiles) {
    output.push({
      table_name,
      key: sql_get_key(file.fileName),
      value: new Uint8Array(file.binary),
    } as SqlWrapper);
  }
  return output;
};
