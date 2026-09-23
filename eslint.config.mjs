import next from "eslint-config-next";

// O ESLint 9 usa "flat config": o .eslintrc.json antigo era simplesmente
// ignorado, e o `next lint` deixou de existir no Next 16.
// Rode com: npm run lint
const config = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**"],
  },
  ...next,
];

export default config;
