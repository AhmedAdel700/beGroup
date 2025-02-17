import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#6D5CBC0D",
        foreground: "var(--foreground)",
        customGreen: "#49BD88",
        customPurple: "#6D5CBC",
      },
      boxShadow: {
        "top-bottom":
          "5px 10px 20px 5px white inset",
      },
    },
  },
  plugins: [],
} satisfies Config;
