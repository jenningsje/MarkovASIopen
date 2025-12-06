// src/global.d.ts
declare module '*.css.ts' {
  const content: { [key: string]: string };
  export = content;
}
