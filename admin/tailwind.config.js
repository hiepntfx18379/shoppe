/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat"', "sans-serif"],
      },

      keyframes: {
        zoomOut: {
          "0%, 50%": { transform: "scale(0.5)" },
          "50%, 100%": { transform: "scale(1)" },
        },
      },

      animation: {
        zoomOut: "zoomOut 2s ease-in-out ",
      },
    },
  },
  plugins: [],
};
