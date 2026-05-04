/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#ff7a1a',
          dark: '#121212',
          soft: '#fff3e8',
        },
      },
      boxShadow: {
        app: '0 18px 45px rgba(15, 15, 15, 0.08)',
      },
    },
  },
  plugins: [],
}
