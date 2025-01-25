import { desktopDir, join } from "@tauri-apps/api/path";
import dict from "../assets/dictionary.json" assert { type: "json" };

export type Root = {
  dir: {
    base: string;
    desktop: string;
    conf: string;
    audio: string;
    images: string;
  };
  file: {
    xlsx: string;
    conf: string;
    color: string;
    api: string;
    db: string;
    server: string;
  };
};
export const ROOT: Root = {} as Root;

export async function paths_init(): Promise<void> {
  const d = dict.paths;

  const desktop = await desktopDir();
  const baseDir = await join(desktop, "TalkTree");

  const paths = {
    dir: {
      base: baseDir,
      desktop: desktop,
      conf: await join(baseDir, d.dirs.conf),
      audio: await join(baseDir, d.dirs.audio),
      images: await join(baseDir, d.dirs.images),
    },
    file: {
      xlsx: await join(baseDir, d.files.xlsx),
      conf: await join(baseDir, d.dirs.conf, `${dict.settings.title}.txt`),
      color: await join(baseDir, d.dirs.conf, `${dict.colors.title}.txt`),
      api: await join(baseDir, d.dirs.conf, `${dict.api_speechgen.title}.txt`),
      db: await join(baseDir, `talktree.db`),
      server: await join(
        baseDir,
        d.dirs.conf,
        `${dict.paths.files.server_id}.txt`,
      ),
    },
  } as Root;

  Object.assign(ROOT, paths);
}
