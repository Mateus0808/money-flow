import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#321ba9",
        secondary: "#33cc95",
        backgroundLight: "#f0f2f5",
        backgroundDark: "#070F20",
        cardDark: "#07152C",
        textLight: "#e5e7eb",
        borderDark: "#111827"
      },
      backgroundImage: {
        "sidebar-dark": "linear-gradient(180deg, #313849, #07152C, #070F20)",
        "sidebar-light": "linear-gradient(180deg, #4A28C6, #3C22B2, #321BA9, #27158A)", 
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
