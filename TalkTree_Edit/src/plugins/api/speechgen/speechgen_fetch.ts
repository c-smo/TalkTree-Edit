import { export_audio } from "../../../_frontend_/export/export_audio";
import { set_border_highlight } from "../../../_frontend_/ui/border_highlight";
import { NEW_WORDS, SET_NEW_WORDS } from "../../../globals";
import { SqlWrapper } from "../../../types/types";
import sql_get_key from "../../sql/sql_get_key";
import { sql_upsert_uint8array } from "../../sql/sql_upsert_unit8array";
import { err } from "../../terminal/commands/logs";
import API from "../__api_main__";
import speechgen_download from "./speechgen_download";

const speechgen_fetch = async (): Promise<void> => {
  API.Q.push(...NEW_WORDS());
  SET_NEW_WORDS([]);

  if (API.has_task) return;
  API.has_task = true;
  set_border_highlight({ visible: true });
  fetch();
};

const fetch = async (): Promise<void> => {
  console.time("✅ API");
  while (API.Q.length) {
    API.expected_data.text = `${API.Q.shift()}`;
    try {
      const uint8array = await speechgen_download();
      if (uint8array) {
        const wrapped_audio: SqlWrapper = {
          table_name: "audio",
          key: sql_get_key(API.expected_data.text),
          value: uint8array,
          file_name: API.expected_data.text,
        };
        await sql_upsert_uint8array(wrapped_audio);
        await export_audio(wrapped_audio);
      }
    } catch (error) {
      err(error);
      continue;
    }
  }
  void on_completed();
};

const on_completed = async () => {
  try {
    set_border_highlight({ visible: false });
    API.has_task = false;
    console.timeEnd("✅ API");
  } catch (error) {
    err(error);
  }
};

export default speechgen_fetch;
