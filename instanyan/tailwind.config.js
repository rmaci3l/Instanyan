/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{html,js}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui'],
      },
      colors: {
        'grey-lighter' : '#3f4147',
        'grey-light' : '#313338',
        'grey-medium' : '#2b2d31',
        'grey-heavy' : '#1e1f22',
        'white-light' : '#eff5ff',
        'white-medium' : '#b5bac1',
        'white-heavy' : '#888b8f',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwindcss-animated')
  ],
}

