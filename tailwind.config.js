/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066FF',
        secondary: '#FF6B00',
        tertiary: '#00C2A8',
        dark: '#1A202C',
        light: '#F7FAFC'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Bricolage Grotesque', 'sans-serif']
      }
    },
  },
  plugins: [],
} 