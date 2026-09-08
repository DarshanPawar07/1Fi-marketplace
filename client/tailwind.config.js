/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        ink: "#111318",
        navy: "#24243A",
        violet: "#6557E8",
        cream: "#F8F7F4",
        warm: "#F4EEE5",
        success: "#16845B",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Manrope", "sans-serif"],
      },

      boxShadow: {
        premium:
          "0 1px 2px rgba(17,19,24,.02), 0 10px 35px rgba(17,19,24,.045)",
      },

      borderRadius: {
        "4xl": "24px",
      },
    },
  },

  plugins: [],
};