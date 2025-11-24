/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  
  extend: {
  boxShadow: {
    ultra: '0 0 0 1px rgba(255,255,255,0.08)',
  },
  transitionTimingFunction: {
    'gentle': 'cubic-bezier(0.23, 1, 0.32, 1)'
  }
}
}
