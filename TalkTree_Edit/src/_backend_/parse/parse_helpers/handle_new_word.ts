import {
  ALL_WORDS,
  NEW_WORDS,
  SET_ALL_WORDS,
  SET_NEW_WORDS,
} from "../../../globals";
import sql_get_key from "../../../plugins/sql/sql_get_key";
import sql_read_uint8array from "../../../plugins/sql/sql_read_unit8array";
import { sql_upsert_uint8array } from "../../../plugins/sql/sql_upsert_unit8array";
import { SqlWrapper } from "../../../types/types";
import { ROOT } from "../../../utils/paths";
import { fs_read_file_without_extension } from "../../fs/fs_read_file";

const handle_new_word = async (new_word: string): Promise<void> => {
  if (new_word === "-" || new_word === "empty_cell") return;
  SET_ALL_WORDS([...ALL_WORDS(), new_word]);

  const key = sql_get_key(new_word);
  const buffer_exists = await sql_read_uint8array("audio", key);

  if (!buffer_exists) {
    const file = await fs_read_file_without_extension(new_word, ROOT.dir.audio);
    if (!file || !file.binary) {
      SET_NEW_WORDS([...NEW_WORDS(), new_word]);
    } else {
      await sql_upsert_uint8array({
        table_name: "audio",
        key,
        value: file.binary,
      } as SqlWrapper);
    }
  }
};

export default handle_new_word;
