/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        main: "rgb(238, 77, 45)",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
