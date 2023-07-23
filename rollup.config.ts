import typescript from "@rollup/plugin-typescript";
export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/harexs-limit.cjs",
      exports: "default",
      format: "cjs",
    },
    {
      file: "dist/harexs-limit.esm.js",
      format: "esm",
    },
    {
      file: "dist/harexs-limit.umd.js",
      format: "umd",
      name: "harexsLimit",
    },
  ],
  plugins: [typescript()],
};
