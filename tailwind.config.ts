import type { Config } from "tailwindcss";

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
      },
    },
    keyframes: {
      bounce: {
        "0%": {
          transform: "translateY(0%)",
        },
        "50%": {
          transform: "translateY(var(--trans-value))",
        },
        "100%": {
          transform: "translateY(0%)",
        },
      },
      scale: {
        "0%": {
          transform: "scale(1.0)",
        },
        "50%": {
          transform: "scale(var(--trans-scale))",
        },
        "100%": {
          transform: "scale(1.0)",
        },
      },
    },
    animation: {
      scale: "spin 1.5s linear infinite",
      bounce: "bounce 2s linear infinite",
    },
  },
  plugins: [],
};
export default config;
