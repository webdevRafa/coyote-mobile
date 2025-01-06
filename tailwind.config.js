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
      'red': '#ce0707',
      'dark-red': '#910707',
      'blue': '#149bcf',
      'dark-blue': '#127ea8'
    },
    extend: {},
  },
  plugins: [],
}

