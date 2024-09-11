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
          transform: 'translateY(0%)',
        },
        "50%": {
          // transform: 'translateY(200px)',
          transform: 'translateY(var(--trans-value))',
        },
        "100%": {
          transform: 'translateY(0%)',
        },
      },
      spin: {
        to: {
          transform: 'rotate(360deg)',
        },
      },
    },
    animation: {
      spin: 'spin 1s linear infinite',
      bounce: "bounce 2s linear infinite",
    },
  },
  plugins: [],
};
export default config;
