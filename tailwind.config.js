/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './client/components/**/*.{html,js,jsx}',
    './server/public/index.html',
  ],
  daisyui: {
    themes: ['emerald'],
  },
  theme: {
    extend: {},
    fontFamily: {
      body: ['Railway', 'Helvetica', 'Arial'],
      secondary: ['Open Sans'],
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/forms')],
}
