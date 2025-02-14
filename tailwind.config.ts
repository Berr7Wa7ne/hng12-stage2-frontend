import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      roman: ["Times New Roman", "serif"],
      grunge: ["GrungeFest", "cursive"],
      roadRage: ["Road Rage", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
    },    
    extend: {
      colors: {
        custom: {
          dark: "#02191D",
          teal: "#0E464F",
          cyan: "#24A0B5",
        },
      },
      backgroundImage: {
        "custom-radial":
          "radial-gradient(circle at 50% 140%, rgba(14, 70, 79, 1) 0%, #02191D 55%)",
        backgroundBlendMode: "overlay",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
