// ./src/components/Button/Button_Container.tsx
import { CURRENT_PROPS, SETTINGS } from "../../../globals";
import { Button_Design } from "./Button_Design";
import { handleUserInput } from "./Button_Mouse";
import Button_Symbol from "./Button_Symbol";

export const Button_Container = (props: {
  index: number;
  is_dragging: () => boolean;
  set_is_dragging: (dragging: boolean) => void;
  pos: () => { x: number; y: number };
  set_pos: (pos: { x: number; y: number }) => void;
  z_index: () => number;
  set_z_index: (z_index: number) => void;
  is_clicked: () => boolean;
  set_is_clicked: (b: boolean) => void;
}) => {
  return (
    <div
      class="button-container"
      id={`button-${props.index}`}
      style={{
        transition: `${props.is_dragging() ? "none" : "transform 1s ease"}`,
        transform: `translate(${props.pos().x}px, ${props.pos().y}px)`,
        cursor: props.is_dragging() ? "grabbing" : "grab",
        "z-index": `${props.is_dragging() ? 1000 : props.z_index()}`,
        display: `${CURRENT_PROPS()[props.index].symbol != "-" ? "flex" : "none"}`,
        "border-radius": `${SETTINGS.radius * 50}%`,
        width: `${props.is_clicked() ? 90 : 100}%`,
        height: `${props.is_clicked() ? 90 : 100}%`,
      }}
      onMouseDown={(e) => {
        handleUserInput(
          e,
          props.index,
          props.set_is_dragging,
          props.is_dragging,
          props.set_pos,
          props.set_z_index,
          props.set_is_clicked,
        );
      }}
      onTransitionEnd={() => {
        props.set_z_index(0);
      }}
    >
      <Button_Design index={props.index} is_clicked={props.is_clicked} />
      <Button_Symbol index={props.index} is_clicked={props.is_clicked} />
    </div>
  );
};
