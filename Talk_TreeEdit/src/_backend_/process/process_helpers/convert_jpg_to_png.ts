import { SqlWrapper } from "../../../types/types";

const jpg_arr_to_png = async (jpg_arr: SqlWrapper[]): Promise<SqlWrapper[]> => {
  const png_arr = [] as SqlWrapper[];
  for (let wrapper of jpg_arr) {
    const binary = await convert_jpg_to_png(wrapper.value);
    if (!binary) continue;
    png_arr.push({
      table_name: wrapper.table_name,
      key: wrapper.key,
      value: binary,
    });
  }
  return png_arr;
};

const convert_jpg_to_png = async (
  jpg_data: Uint8Array,
): Promise<Uint8Array | null> => {
  return new Promise((resolve, reject) => {
    const blob = new Blob([jpg_data], { type: "image/jpeg" });
    const image = new Image();
    image.onload = () => {
      const canvas = new OffscreenCanvas(image.width, image.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject("Canvas context not available");
        return;
      }
      ctx.drawImage(image, 0, 0);
      canvas
        .convertToBlob({ type: "image/png" })
        .then((blob) => {
          if (!blob) {
            resolve(null);
            return;
          }
          blob
            .arrayBuffer()
            .then((buffer) => {
              resolve(new Uint8Array(buffer));
            })
            .catch(reject);
        })
        .catch(reject);
    };
    image.onerror = reject;
    image.src = URL.createObjectURL(blob);
  });
};

export default jpg_arr_to_png;
