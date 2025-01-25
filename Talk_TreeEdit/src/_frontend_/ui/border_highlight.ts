import { BorderHightlightProps, BorderPulseProps } from "../../types/types";
import { sleep } from "../../utils/helpers";

export async function trigger_border_pulse({
  duration = 300,
  color = "rgba(255,255,255,0.4)",
  spread = 5,
  softness = 12,
}: Partial<BorderPulseProps> = {}): Promise<void> {
  document.body.style.boxShadow = `inset 0 0 ${softness}px ${spread}px ${color}`;
  document.body.style.transition = `box-shadow ${duration}ms ease-in-out`;
  await sleep(duration / 2);
  document.body.style.boxShadow = `inset 0 0 ${softness}px ${spread}px rgba(255,255,255,0)`;

  await sleep(duration / 2);
}

export async function set_border_highlight({
  visible = true,
  color = "rgba(255,255,255,0.4)",
  spread = 4,
  softness = 12,
}: Partial<BorderHightlightProps> = {}): Promise<void> {
  document.body.style.transition = `box-shadow 200ms ease-in-out`;
  visible
    ? (document.body.style.boxShadow = `inset 0 0 ${softness}px ${spread}px ${color}`)
    : (document.body.style.boxShadow = `inset 0 0 ${softness}px ${spread}px rgba(255,255,255,0)`);
}
