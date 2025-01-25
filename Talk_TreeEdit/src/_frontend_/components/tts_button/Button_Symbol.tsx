import { CURRENT_PROPS, SETTINGS } from "../../../globals";
import { TTSButton } from "../../../types/types";
import { GRID } from "../../../utils/grid";

const Button_Symbol = (props: { index: number; is_clicked: () => boolean }) => {
  return (
    <>
      {CURRENT_PROPS()[props.index].symbol.includes("data:image/png;base64") ? (
        <img
          class="button-symbol"
          style={{
            width: "100%",
          }}
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

function get_font_size(data: TTSButton): number {
  const MAX_WIDTH = 0.7;
  const MIN_FONT_SIZE = 5;
  const symbol = data.symbol;
  let font_size = Math.min(GRID.cellHeight, GRID.cellWidth) * 0.5;
  let text_width = get_text_width(symbol, font_size);

  while (font_size > MIN_FONT_SIZE && text_width > GRID.cellWidth * MAX_WIDTH) {
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
