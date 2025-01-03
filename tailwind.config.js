/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "darkBoxColor":"#1B1B1B",
        "darkPrimaryTextColor":"#F0F0F0",
        "darkSecondaryTextColor":"#B0B0B0",
        "darkButtonsTextColor":"#505050",
        "darkBgColor":"black",
        "darkNavBgColor":"#1F1F1F",
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg, #121212, #1e1e1e, #292929)',
        'dark-grey-black': 'linear-gradient(90deg, #1c1c1c, #0d0d0d)',
        'soft-black': 'linear-gradient(180deg, #1a1a1a, #121212, #000000)',
        'steel-charcoal': 'linear-gradient(45deg, #2c2c2c, #1a1a1a, #0b0b0b)',
        'radial-dark': 'radial-gradient(circle, #1e1e1e, #121212, #0b0b0b)',
      },

    },
  },
  plugins: [],
}