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
        'grey-light' : '#313338',
        'grey-medium' : '#2b2d31',
        'grey-heavy' : '#1e1f22',
        'white-light' : '#eff5ff',
        'white-medium' : '#b5bac1',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

