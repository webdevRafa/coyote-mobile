/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'gray': '#202126',
      'shade-gray': '#1c1d21',
      'dark-gray': '#19191d',
      'white': '#ffffff',
      'off-white': '#E0E0E0',
      'red': '#71001a',
      'dark-red': '#910707',
      'blue': '#054e71',
      'dark-blue': '#127ea8',
      'green': '#05715e',
      'sky': '#097bd5',
      'shade': '#f6f6f6'
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Variable font with all weights
        bona: ['BonaNovaSC', 'serif'], // Bona Nova SC for a serif style
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['Playfair', 'serif'],
      },
    },
  },
  plugins: [],
}

