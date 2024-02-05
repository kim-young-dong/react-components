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
        primary: "#09289a",
        secondary: "#ecdad3",
        thirdary: "#f1f5f9",
      },
      fontFamily: {
        "my-font": ["Noto Sans KR", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
