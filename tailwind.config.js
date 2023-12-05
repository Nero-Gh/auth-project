/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      boxShadow: {
        "outline-box-white": "-1px -1px 18px 4px rgba(255,255,255,0.47)",
      },
    },
  },
  plugins: [],
};
