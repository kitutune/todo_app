/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  purge: {
    content: [
      // "./src/pages/**/*.{js,ts,jsx,tsx}",
      // "./src/components/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
      // https://purgecss.com/safelisting.html#patterns
      safelist: {
        standard: [/^bg-/, /^text-/],
      },
    },
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
