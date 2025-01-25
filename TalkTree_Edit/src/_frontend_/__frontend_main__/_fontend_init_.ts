import { cells } from "../../__main__/__main__";
import { SETTINGS } from "../../globals";
import { err } from "../../plugins/terminal/commands/logs";
import { create_grid } from "../../utils/grid";
import frontend_update from "./frontend_update";

const _frontend_init_ = async () => {
  create_grid();
  init_cells();
  await frontend_update().catch((e) => err(e));
};

const init_cells = () => {
  for (let i = 0; i < SETTINGS.cols * SETTINGS.rows; i++) {
    cells.push(i);
  }
};

export default _frontend_init_;
