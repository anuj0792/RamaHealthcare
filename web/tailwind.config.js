/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#123B60',
        teal: '#168C91',
        canvas: '#F3F7FA',
      },
    },
  },
  plugins: [],
}