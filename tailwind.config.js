/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lemon: ['Lemon', 'serif'],
        openSans: ['Open Sans', 'sans-serif']
      },
      colors: {
        'dark-red': '#DC0000',
        'dark-maroon': '#850000',
        'pastel-yellow': '#FFDB89',
        'pale-yellow': '#FFF6C3'
      }
    }
  },
  plugins: []
}
