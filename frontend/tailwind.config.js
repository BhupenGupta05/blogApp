/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fde4d4',
        secondary: '#9a8185',
        tertiary: '#3b3b3b',
        quad: '#050217'
      },
    },
  },
  plugins: [],
}