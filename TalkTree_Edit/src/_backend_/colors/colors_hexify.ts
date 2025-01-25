const colors_hexify = (string: string): string | null => {
  if (!string || string === "-" || string === "empty_cell") return null;
  const clean_string = string.replace(/# /g, "");
  const regex = /^[a-fA-F0-9]+$/;
  if (regex.test(clean_string) && clean_string.length === 6) {
    return `#${clean_string}`;
  }
  return null;
};

export default colors_hexify;
