/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/script.js"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      colors: {
        dkgreen: "#14B34B",
        lggreen: "#4FFF8D",
        dkpink: "#FF554F",
        lgpink: "#FF6E68",
        dkblue: "#112F41",
        dkred: "#B32A25",
        gwrhite: "#878B8C",
        Yellow: "#F2B134",
        bgwhite: "#F2F2F2",
        bgblack: "#000000",
      },
      fontFamily: {
        OSWALD: ["Oswald", "sans-serif"],
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
  },
};
