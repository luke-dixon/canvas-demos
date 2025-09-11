import js from "@eslint/js";
import jasmine from "eslint-plugin-jasmine";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: [
      "*.{js,mjs}",
      "spec/**/*.{js,mjs,cjs}",
      "src/**/*.{js,mjs,cjs}",
    ],
    plugins: { js, jasmine },
    extends: [
      "js/recommended",
      "jasmine/recommended",
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jasmine,
      },
    },
  },
]);
