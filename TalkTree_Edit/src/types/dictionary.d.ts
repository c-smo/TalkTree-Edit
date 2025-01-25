// src/types/dictionary.d.ts
export interface DictionaryData {
  settings: {
    fileName: string;
    title: string;
    data: {
      rows: string;
      cols: string;
      aspect_ratio: string;
      radius: string;
    };
  };
  colors: {
    fileName: string;
    title: string;
    data: {
      background: string;
      button: string;
      text: string;
      spacer: string;
      black: string;
      white: string;
      red: string;
      orange: string;
      yellow: string;
      green: string;
      blue: string;
      purple: string;
    };
  };
  anotherCategory: {
    foo: string;
    baz: string;
  };
}
