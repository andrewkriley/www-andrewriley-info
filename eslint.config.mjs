import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypeScript,
  {
    ignores: [
      ".next/**",
      ".open-next/**",
      "node_modules/**",
      "public/**",
      "resources/**",
      "themes/**",
    ],
  },
];

export default eslintConfig;
