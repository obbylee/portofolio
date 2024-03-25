/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "playfair-display": ["Playfair Display", "serif"],
        "plus-jakarta-sans": ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        "primary-color": "#b1454a",
        "secondary-color": "#121212",
        "black-200": "#020202",
        "black-300": "#333333",
        "black-400": "#1f1e31",
        "black-500": "#555555",
        "gray-100": "#888888",
        "color-creamson": "#fff0de",
      },
      backgroundImage: {
        about1: "url('assets/about_bg1.png')",
        about2: "url('assets/about_bg2.png')",
        "popular-food": "url(assets/popular_bg.png)",
        "japanese-sushi": "url(assets/japanese_sushi.png)",
        "japanese-drink": "url(assets/japanese_drinks.png)",
        subscribe: "url(assets/subscribe_bg.png)",
      },
      screens: {
        wide: "1280px",
      },
    },
  },
  plugins: [],
};
