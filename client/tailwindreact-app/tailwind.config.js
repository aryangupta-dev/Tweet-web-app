module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {fontFamily:{
      staatliches:['"Staatliches"', '"cursive"']
    },},
  },
  variants: {
    extend: {
      
  },
  },
  plugins: [],
}
