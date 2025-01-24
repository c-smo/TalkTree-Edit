import { Sheet, utils } from "xlsx";

const get_sheet_data = (sheet: Sheet): string[][] => {
  return utils.sheet_to_json(sheet, {
    header: 1,
    raw: true,
    blankrows: false,
    defval: "empty_cell",
  }) as unknown as string[][];
};

export default get_sheet_data;
