import hash from "hash.js";

const MAX_KEY_LENGTH = 8;

const sql_get_key = (string: string): string => {
  if (!string) return "";
  const normalized_and_lowered = String(string).normalize("NFC").toLowerCase();
  return hash
    .sha1()
    .update(normalized_and_lowered)
    .digest("hex")
    .substring(0, MAX_KEY_LENGTH);
};

export default sql_get_key;
