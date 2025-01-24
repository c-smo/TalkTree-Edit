import clear from "./clear";
import { dump, err } from "./logs";

const exec = async (argv: string[]) => {
  try {
    const cmd = argv[0].toLowerCase() as keyof typeof map;
    const arg = argv.slice(1).join("");
    const map = {
      clear: clear,
      dump: dump,
    };

    if (Object.keys(map).includes(cmd)) {
      map[cmd](arg);
    }
  } catch (error) {
    err(error);
  }
};

export default exec;
