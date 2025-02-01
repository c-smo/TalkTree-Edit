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
    new_words: string;
    image_template: string;
    image_template2: string;
  };
};
export const ROOT: Root = {} as Root;

export async function paths_init(): Promise<void> {
  const desktop = await desktopDir();
  const baseDir = await join(desktop, "TalkTree");

  const d = dict.paths;

  const paths: Root = {
    dir: {
      base: baseDir,
      desktop: desktop,
      conf: await join(baseDir, d.dirs.conf),
      audio: await join(baseDir, d.dirs.audio),
      images: await join(baseDir, d.dirs.images),
    },
    file: {
      db: await join(baseDir, `talktree.db`),
      xlsx: await join(baseDir, d.files.xlsx),
      conf: await join(baseDir, d.dirs.conf, `${d.files.settings}`),
      color: await join(baseDir, d.dirs.conf, `${d.files.colors}`),
      api: await join(baseDir, d.dirs.conf, `${d.files.api_speechgen}`),
      server: await join(baseDir, d.dirs.conf, `${d.files.server_id}`),
      new_words: await join(baseDir, d.dirs.audio, `${d.files.new_words}`),
      image_template: await join(
        baseDir,
        d.dirs.images,
        `${d.files.image_template}`,
      ),
      image_template2: await join(
        baseDir,
        d.dirs.images,
        `${d.files.image_template2}`,
      ),
    },
  };

  Object.assign(ROOT, paths);
}
