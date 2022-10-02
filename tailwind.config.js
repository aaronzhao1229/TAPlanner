/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './client/components/**/*.{html,js,jsx}',
    './server/public/index.html',
  ],
  daisyui: {
    themes: [
      'emerald',
      // {
      // mytheme: {
      //   primary: '#22e590',

      //   secondary: '#77e5b0',

      //   accent: '#d37c61',

      //   neutral: '#252F41',

      //   'base-100': '#E8E6EA',

      //   info: '#A3E4F5',

      //   success: '#0F674B',

      //   warning: '#F99A0B',

      //   error: '#ED7387',
      //   // },
      // },
    ],
  },
  theme: {
    extend: {},
    fontFamily: {
      body: ['Railway', 'Helvetica', 'Arial'],
      secondary: ['Open Sans'],
    },
  },
  plugins: [require('daisyui')],
}
