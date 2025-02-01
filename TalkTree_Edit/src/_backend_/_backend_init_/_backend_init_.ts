import API from "../../plugins/api/__api_main__";
import sql_upsert_wrapper_array from "../../plugins/sql/sql_upsert_wrapper_array";
import { err } from "../../plugins/terminal/commands/logs";
import process_audio from "../process/process_audio";
import process_color from "../process/process_color";
import process_settings from "../process/process_settings";
import process_xlsx from "../process/process_xlsx";

const _backend_init_ = async () => {
  await process_settings();
  await process_color();

  try {
    const audio_wrapper_array = await process_audio();
    await sql_upsert_wrapper_array(audio_wrapper_array);

    const xlsx_wrapper_array = await process_xlsx();
    await sql_upsert_wrapper_array(xlsx_wrapper_array);

    if (await API.init()) {
      void API.fetch();
    }
  } catch (error) {
    err(error);
  }
};

export default _backend_init_;
