import { CURRENT_PROPS } from "../../../globals";
import { CLICK_DELAY_MS } from "./Button_Action";

export const Button_Design = (props: {
  index: number;
  is_clicked: () => boolean;
}) => {
  return (
    <div
      class="button-design"
      style={{
        background: `${CURRENT_PROPS()[props.index].color}`,
        transform: `${props.is_clicked() === true ? "scale(0.95)" : "scale(1)"}`,
        transition: `box-shadow ${CLICK_DELAY_MS / 1000}s ease-in-out`,
        "box-shadow": `${
          props.is_clicked() === true
            ? "inset 0px 0px 20px 5px rgba(255, 255, 255, 0.2)"
            : "inset -5px -5px 10px 1px rgba(0, 0, 0, 0.3)"
        }`,
      }}
    ></div>
  );
};
