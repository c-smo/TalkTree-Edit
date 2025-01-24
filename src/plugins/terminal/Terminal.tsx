import { createSignal, onMount } from "solid-js";
import { sleep } from "../../utils/helpers";
import exec from "./commands/_exec";
import { err, log, messages } from "./commands/logs";
import "./terminal.css";
import { TerminalLog } from "./terminal_types";

const [command, set_command] = createSignal("");
export const [TERMINAL_IS_VISIBLE, terminal_set_is_visible] =
  createSignal(false);
const [shouldRender, setShouldRender] = createSignal(false);

const user = "tt5";
const location = "WebSocket-Client";

const handle_keydown = async (e: KeyboardEvent) => {
  if (e.key === "Enter" && command().trim() !== "") {
    try {
      const argv = command().split(" ");
      await exec(argv);
      set_command("");
    } catch (error) {
      err(error);
    }
  }
};

const toggleTerminal = async () => {
  if (!TERMINAL_IS_VISIBLE()) {
    setShouldRender(true);
    setTimeout(() => terminal_set_is_visible(true), 0);
  } else {
    terminal_set_is_visible(false);
    await sleep(50);
    setShouldRender(false);
  }
};

const Terminal = () => {
  onMount(() => {
    hook();
    log("Websocket Client v1.0");
  });

  return (
    <div
      classList={{
        terminal: shouldRender(),
        hidden: !TERMINAL_IS_VISIBLE(),
        "display-none": !shouldRender(),
      }}
    >
      <div class="terminal">
        {/* Logs */}
        <div class="logs-container">
          {messages().map((terminal_log: TerminalLog) =>
            terminal_log.type === "Terminal" ? (
              <div class="error-container">
                <span class="error-tag">[ERR]</span>
                <span class="error-message">{` ${terminal_log.content}`}</span>
              </div>
            ) : (
              <div class="log-message">{terminal_log.content}</div>
            ),
          )}
        </div>
        {/* Input Field */}
        <input
          id="auto_focus"
          class="input-field"
          type="text"
          value={command()}
          onInput={(e) => set_command(e.currentTarget.value)}
          onKeyDown={handle_keydown}
          placeholder=""
          autofocus
        />
      </div>
    </div>
  );
};

const hook = () => {
  const inputElement = document.getElementById(
    "auto_focus",
  )! as HTMLInputElement;

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      if (document.activeElement !== inputElement) {
        inputElement.select();
      }
    } else if (event.key === "Escape") {
      toggleTerminal();
      if (!TERMINAL_IS_VISIBLE()) {
        setTimeout(() => inputElement.focus(), 300);
      }
    }
  });
};

export const get_prefix = () => `${user}@${location}`;

export default Terminal;
