/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'gray': '#202126',
      'dark-gray': '#19191d',
      'white': '#ffffff',
      'off-white': '#f8f8f8',
      'red': '#71001a',
      'dark-red': '#910707',
      'blue': '#054e71',
      'dark-blue': '#127ea8',
      'green': '#05715e'
    },
    extend: {},
  },
  plugins: [],
}

