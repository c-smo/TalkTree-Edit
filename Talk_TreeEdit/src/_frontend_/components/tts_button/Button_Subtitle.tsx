import { CURRENT_PROPS, SETTINGS } from "../../../globals";

const Button_Suptitle = (props: {
  index: number;
  is_clicked: () => boolean;
}) => {
  return (
    <div
      class="button-subtitle"
      style={{
        transform: "none",
        display: `${CURRENT_PROPS()[props.index].subtitle != "-" && CURRENT_PROPS()[props.index].subtitle != "empty_cell" ? "flex" : "none"}`,
        "border-radius": `${SETTINGS.radius * 50}%`,
        background: `${CURRENT_PROPS()[props.index].color}`,
        color: `${SETTINGS.default_colors.text}`,
        "margin-top": `${props.is_clicked() ? 12 : 2}%`,
      }}
    >
      <span class="subtitle-span">{CURRENT_PROPS()[props.index].subtitle}</span>
    </div>
  );
};

export default Button_Suptitle;
