/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nee: {
          50: '#f0fbfb',
          100: '#dff8f6',
          200: '#bfeef0',
          300: '#8de3e8',
          400: '#4fcadf',
          500: '#1db3c6',
          600: '#1796a1',
          700: '#116f73',
          800: '#0c4b4f',
          900: '#052d2d'
        }
      }
    },
  },
  plugins: [],
};
