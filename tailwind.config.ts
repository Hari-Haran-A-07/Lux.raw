import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        raw: {
          950: "#080808",
          900: "#111111",
          850: "#171717",
          800: "#222222",
          700: "#383838",
          600: "#555555",
          500: "#777777",
          400: "#999999",
          300: "#bbbbbb",
          200: "#dddddd",
          150: "#eae8e4",
          100: "#f4f3ef",
          50: "#faf9f6",
        },
        gold: {
          accent: "#b59a6d",
          light: "#d4be98",
          dark: "#8f754a",
        },
        sand: {
          50: "#fbfaf8",
          100: "#f5f3ee",
          200: "#eae6dc",
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Didot", "Cinzel", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "Helvetica Neue", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        ultra: "0.35em",
      },
      aspectRatio: {
        "3/4": "3 / 4",
        "4/5": "4 / 5",
        "9/16": "9 / 16",
        "16/9": "16 / 9",
        "2/3": "2 / 3",
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-up": "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-subtle": "scaleSubtle 20s ease infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleSubtle: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.06)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
