/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f0b07",
        pearl: "#fbf7f2",
        beige: "#f1e7da",
        gold: "#caa86a",
        bronze: "#8c6b3e"
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        glow: "0 30px 120px -40px rgba(202, 168, 106, 0.55)",
        inset: "inset 0 0 0 1px rgba(255, 255, 255, 0.1)"
      }
    }
  },
  plugins: []
};
