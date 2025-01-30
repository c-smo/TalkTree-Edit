import { CURRENT_PROPS, SETTINGS } from "../../../globals";
import { TTSButton } from "../../../types/types";
import { GRID } from "../../../utils/grid";

const Button_Symbol = (props: { index: number; is_clicked: () => boolean }) => {
  return (
    <>
      {CURRENT_PROPS()[props.index].symbol.includes("data:image/png;base64") ? (
        <img
          class={
            CURRENT_PROPS()[props.index].is_emoji
              ? "button-symbol emoji"
              : "button-symbol"
          }
          style={{}}
          src={CURRENT_PROPS()[props.index].symbol}
        />
      ) : (
        <span
          class="button-symbol"
          style={{
            color: `${SETTINGS.default_colors.text}`,
            "font-size": `${get_font_size(CURRENT_PROPS()[props.index]) * (props.is_clicked() ? 0.9 : 1)}px`,
          }}
        >
          {CURRENT_PROPS()[props.index].symbol}
        </span>
      )}
    </>
  );
};

const width_is_smaller = () => {
  return GRID.cell_width < GRID.cell_height;
};

const get_image_width = (button: TTSButton) => {
  if (button.is_emoji) {
    return "70%";
  }
  if (GRID.cell_width > GRID.cell_height) {
    return "100%";
  } else {
    return "auto";
  }
};

const get_image_height = (button: TTSButton) => {
  if (GRID.cell_width > GRID.cell_height) {
    return "auto";
  } else {
    return "100%";
  }
};

// const get_image_size = (button: TTSButton, check_against: number): string => {
//   if (button.is_emoji && check_against === GRID.cell_height) {
//     return "70%";
//   } else if (Math.min(GRID.cell_height, GRID.cell_width) === check_against) {
//     return "100%";
//   }
//   return "auto";
// };

function get_font_size(data: TTSButton): number {
  const MAX_WIDTH = 0.7;
  const MIN_FONT_SIZE = 5;
  const symbol = data.symbol;
  let font_size = Math.min(GRID.cell_height, GRID.cell_width) * 0.5;
  let text_width = get_text_width(symbol, font_size);

  while (
    font_size > MIN_FONT_SIZE &&
    text_width > GRID.cell_width * MAX_WIDTH
  ) {
    font_size -= 1;
    text_width = get_text_width(symbol, font_size);
  }
  return font_size;
}

function get_text_width(text: string, font_size: number): number {
  const root = document.documentElement;
  const font = getComputedStyle(root).getPropertyValue("--global-font-family");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  context.font = `${font_size}px ${font}`;
  const width = context.measureText(text).width;
  canvas.remove();
  return width;
}

export default Button_Symbol;
