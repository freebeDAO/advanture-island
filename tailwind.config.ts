import type { Config } from "tailwindcss";
import { blackA, violet, mauve } from '@radix-ui/colors';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ...blackA,
        ...violet,
        ...mauve,
      },
    },
  },
  plugins: [],
};
export default config;
