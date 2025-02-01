import { createSignal, onMount } from "solid-js";
import { SETTINGS } from "../../../globals";
import { set_grid_cell_size } from "../../../utils/grid";
import print_image_template from "../../../utils/printer/print_image_template";
import { Button_Container } from "../tts_button/_Button_Container";
import Button_Subtitle from "../tts_button/Button_Subtitle";

export const Cell = (props: { index: number }) => {
  const [is_dragging, set_is_dragging] = createSignal(false);
  const [pos, set_pos] = createSignal({ x: 0, y: 0 });
  const [z_index, set_z_index] = createSignal(0);
  const [is_clicked, set_is_clicked] = createSignal(false);

  onMount(() => {
    set_grid_cell_size();
    print_image_template();
  });

  return (
    <div
      class="grid-cell"
      style={{
        "border-radius": `${SETTINGS.radius * 50}%`,
      }}
    >
      <Button_Container
        index={props.index}
        is_dragging={is_dragging}
        set_is_dragging={set_is_dragging}
        pos={pos}
        set_pos={set_pos}
        z_index={z_index}
        set_z_index={set_z_index}
        is_clicked={is_clicked}
        set_is_clicked={set_is_clicked}
      />
      <Button_Subtitle index={props.index} is_clicked={is_clicked} />
    </div>
  );
};
