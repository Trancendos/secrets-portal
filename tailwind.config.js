/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        github: {
          dark: "#0d1117",
          lighter: "#161b22",
          border: "#30363d",
          text: "#c9d1d9",
          primary: "#1f6feb",
          success: "#3fb950",
          danger: "#f85149",
          warning: "#d29922",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};