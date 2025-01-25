import { invoke } from "@tauri-apps/api/core";
import { err } from "../../terminal/commands/logs";
import API from "../__api_main__";

const speechgen_download = async (): Promise<Uint8Array | null> => {
  try {
    const url = await invoke<string>("request_link", {
      request: API.expected_data,
    });
    if (!url) {
      console.warn("Invalid speechgen data", API.expected_data);
      return null;
    }
    const data = await invoke<Uint8Array>("download_file", {
      url,
    });
    return data;
  } catch (error) {
    err(error);
  }
  return null;
};

export default speechgen_download;
