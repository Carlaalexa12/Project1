module.exports = {
  content: ["./views/**/*.ejs"],
  daisyui: {
    themes: ['cupcake'],
  },
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
