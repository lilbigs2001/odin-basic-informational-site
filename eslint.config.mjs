import eslintConfigPrettier from "eslint-config-prettier";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  eslintConfigPrettier,
  pluginJs.configs.recommended,
];
