// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Adiciona a fonte 'Inter' como principal
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Você pode definir suas cores aqui se quiser
        emerald: {
          400: '#34d399',
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}