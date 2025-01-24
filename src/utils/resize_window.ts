import {
  currentMonitor,
  getCurrentWindow,
  PhysicalSize,
} from "@tauri-apps/api/window";
import { SETTINGS } from "../globals";
import { err } from "../plugins/terminal/commands/logs";

export const resize_window = async () => {
  try {
    const monitor = await currentMonitor();
    const currentWindow = getCurrentWindow();

    if (!monitor || !currentWindow) return;
    const aspect_ratio = SETTINGS.aspect_ratio.split(":").map(Number);

    let w = aspect_ratio[0];
    let h = aspect_ratio[1];

    const shorter_side = Math.min(monitor.size.width, monitor.size.height);

    while (h < shorter_side * 0.75) {
      w += aspect_ratio[0];
      h += aspect_ratio[1];
    }
    const size = new PhysicalSize(w, h);
    await currentWindow.setSize(size);
  } catch (error) {
    err(error);
  }
};
