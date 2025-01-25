import { err } from "../plugins/terminal/commands/logs";

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const sql_string_to_uint8Array = (value: string): Uint8Array => {
  try {
    const array = JSON.parse(value) as number[];

    if (
      !Array.isArray(array) ||
      !array.every((n) => Number.isInteger(n) && n >= 0 && n <= 255)
    ) {
      throw new Error("Invalid array data for Uint8Array conversion");
    }

    return new Uint8Array(array);
  } catch (error) {
    err(error);
    throw error;
  }
};

export const uint8array_to_base64 = (buffer: Uint8Array): string => {
  let binary = "";
  const len = buffer.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return `data:image/png;base64,${btoa(binary)}`;
};
