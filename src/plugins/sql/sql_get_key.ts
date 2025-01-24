import hash from "hash.js";

const MAX_KEY_LENGTH = 8;

const sql_get_key = (string: string): string => {
  if (!string) return "";
  const lowered_string = String(string).toLowerCase();
  return hash
    .sha1()
    .update(lowered_string)
    .digest("hex")
    .substring(0, MAX_KEY_LENGTH);
};

export default sql_get_key;
