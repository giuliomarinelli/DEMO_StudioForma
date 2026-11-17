import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { qwikEslint9Plugin } from "eslint-plugin-qwik";

export default tseslint.config(
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "server/**",
      ".qwik-scaffold/**",
      ".wrangler/**",
      "test-results/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  qwikEslint9Plugin.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.serviceworker,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
