import { SETTINGS } from "../../../globals";
import { GRID } from "../../../utils/grid";
import { click_action, trigger_action } from "./Button_Action";

export const handleUserInput = (
  e: MouseEvent,
  index: number,
  set_is_dragging: (dragging: boolean) => void,
  is_dragging: () => boolean,
  set_pos: (pos: { x: number; y: number }) => void,
  set_z_index: (z_index: number) => void,
  set_is_clicked: (b: boolean) => void,
) => {
  e.preventDefault();
  const startX = e.clientX;
  const startY = e.clientY;

  const clean = () => {
    set_is_dragging(false);
    set_z_index(500);
    set_pos({ x: 0, y: 0 });
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    const x = e.clientX - startX;
    const y = e.clientY - startY;
    set_pos({ x: x, y: y });

    if (mouseInsideMargin(e) && is_dragging()) {
      clean();
      void trigger_action(index).catch();
    }
  };

  const onMouseUp = () => {
    clean();
  };

  if (SETTINGS.use_swipe) {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    set_is_dragging(true);
  } else {
    click_action(index, set_is_clicked);
  }
};

const mouseInsideMargin = (e: MouseEvent): boolean => {
  const m = GRID.margin / 2;
  return !(
    e.clientX > m &&
    e.clientX < window.innerWidth - m &&
    e.clientY > m &&
    e.clientY < window.innerHeight - m
  );
};
