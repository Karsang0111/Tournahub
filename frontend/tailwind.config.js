import plugin from 'tailwindcss/plugin'

export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/preline/dist/*.js" // Preline components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin') // Preline plugin
  ],
}
