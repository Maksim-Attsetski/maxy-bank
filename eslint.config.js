import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    env: {
      "browser": true,
      "es2021": true
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "prettier"
    ],
    settings: {
      "react": {
        "version": "detect"
      }
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      "ecmaVersion": "latest",
      "sourceType": "module"
    },
    plugins: [
      "@typescript-eslint",
      "react",
      "prettier",
      "unused-imports"
    ],
    rules: {
      "prettier/prettier": [
        "warn",
        {
          "tabWidth": 2,
          "endOfLine": "auto",
          "printWidth": 100,
          "useTabs": false,
          "semi": true,
          "singleQuote": true,
          "jsxSingleQuote": false,
          "quoteProps": "as-needed",
          "trailingComma": "es5",
          "bracketSpacing": true,
          "bracketSameLine": false,
          "arrowParents": "always",
          "embeddedLanguageFormatting": "auto",
          "parser": "typescript"
        }
      ],
      "prefer-const": "warn",
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-constant-binary-expression": "warn",
      "no-constant-condition": "warn",
      "no-dupe-else-if": "error",
      "no-duplicate-imports": "warn",
      "no-loss-of-precision": "warn",
      "max-params": [
        "warn",
        4
      ],
      "no-eval": "error",
      "no-script-url": "error",
      "no-lonely-if": "warn",
      "no-param-reassign": [
        "warn",
        {
          "props": false
        }
      ],
      "no-unneeded-ternary": "warn",
      "no-useless-return": "warn",
      "no-var": "error",
      "require-await": "warn",
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react/function-component-definition": [
        "warn",
        {
          "namedComponents": "arrow-function"
        }
      ],
      "react/no-danger": "error",
      "react/self-closing-comp": "warn",
      "react/jsx-closing-bracket-location": [
        "warn",
        "tag-aligned"
      ],
      "react/jsx-closing-tag-location": "warn",
      "react/jsx-fragments": [
        "warn",
        "syntax"
      ],
      "react/jsx-key": "warn",
      "react/jsx-no-useless-fragment": "warn",
      "react/jsx-pascal-case": "error",
      "consistent-return": "warn",
      "@typescript-eslint/member-delimiter-style": "warn",
      "no-useless-escape": "off",
      "react/jsx-curly-brace-presence": "warn"
    }
  }
]);