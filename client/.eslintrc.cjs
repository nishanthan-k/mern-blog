module.exports = {
  parser: "@babel/eslint-parser", // Use Babel parser for parsing JavaScript/JSX
  parserOptions: {
    ecmaVersion: 2021, // Use ECMAScript 2021
    sourceType: "module", // Allow the use of imports
    ecmaFeatures: {
      jsx: true, // Enable JSX
    },
  },
  env: {
    browser: true, // Enable browser environment
    es2021: true, // Enable ES2021 globals
    node: true, // Enable Node.js environment
  },
  extends: ["eslint:recommended", "plugin:react/recommended"], // Use recommended ESLint rules and React rules
  plugins: ["react"], // Enable React plugin
  rules: {
    // Add custom rules here
    // For example:
    "react/react-in-jsx-scope": "off", // Allows the omission of React import in files using JSX
    "react/prop-types": "off", // Turn off prop-types validation (optional)
  },
  settings: {
    react: {
      version: "detect", // Automatically detect React version
    },
  },
};