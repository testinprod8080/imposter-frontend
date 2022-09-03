/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   'metal': '#2E3138',
    //   'wasssup': colors.gray,
    // },
    extend: {
      colors: {
        'primary': 'var(--primary-color)'
      }
    },
  },
  plugins: [],
}
