/** @type {import("eslint").Linter.Config} */

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "jsx-a11y",
    "import"
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react/jsx-uses-vars": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    ],
  },
  ignorePatterns: [
    "build/**/*",
    "public/build/**/*",
    "node_modules",
    "release.zip"
  ],
  overrides: [
    {
      files: ["server.{js,mjs}", "server/**/*.js", "scripts/**/*.js"],
      env: {
        node: true,
        browser: false,
      },
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        project: null,
      },
    },
    {
      files: ["*.config.js", "*.cjs"],
      env: {
        node: true,
      },
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        project: null,
      },
    },
  ],
};
