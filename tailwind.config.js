/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-gray': '#171a19',
        'my-yellow': '#dba352',
        'my-green': '#4f9d77',
        'my-red': '#d15849',
        'my-blue': '#5fa2bf',
        'my-purple': '#7353BA',
      },
    },
  },
  plugins: [],
}

