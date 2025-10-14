/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#29235C',
          50:  '#FFFFFF',
          100: '#E7E7ED',
          200: '#B8B6C9',
          300: '#8885A4',
          400: '#595480',
          500: '#29235C',
          600: '#201B48',
          700: '#171333',
          800: '#0E0C1F',
          900: '#05040A',
        },
        secondary: {
          DEFAULT: '#4D63FF',
          50:  '#FFFFFF',
          100: '#EBEEFF',
          200: '#C4CBFF',
          300: '#9CA8FF',
          400: '#7586FF',
          500: '#4D63FF',
          600: '#3C4DC6',
          700: '#2B378E',
          800: '#1A2155',
          900: '#090B1C',
        },
        accent: {
          orange: {
            DEFAULT: '#FF5500',
            50:'#FFFFFF',100:'#FFECE3',200:'#FFC6AA',300:'#FFA171',400:'#FF7B39',
            500:'#FF5500',600:'#C64200',700:'#8E2F00',800:'#551C00',900:'#1C0900',
          },
          green: {
            DEFAULT: '#4BFFA5',
            50:'#FFFFFF',100:'#EBFFF5',200:'#C3FFE1',300:'#9BFFCD',400:'#73FFB9',
            500:'#4BFFA5',600:'#3AC680',700:'#2A8E5C',800:'#195537',900:'#081C12',
          },
        },
        surface: {
          bg: '#F9F7F0',
          fg: '#111827',
          white: '#FFFFFF',
          black: '#030712',
        },
        success: { DEFAULT: '#41cb90' },
        info:    { DEFAULT: '#2f80ed' },
        warning: { DEFAULT: '#edc25e' },
        danger:  { DEFAULT: '#eb5757' },
      },
      borderRadius: {
        // Radius.pdf
        100: '4px',
        200: '8px',
        300: '12px',
        400: '16px',
        500: '20px',
        600: '24px',
        700: '32px',
        800: '48px',
      },
      boxShadow: {
        // Shadows.pdf
        'e-100': '0 4px 4px rgb(3 7 18 / 12%)',
        'e-200': '0 6px 16px rgb(3 7 18 / 12%)',
        'e-300': '0 14px 24px rgb(3 7 18 / 12%)',
        'e-400': '0 28px 48px rgb(3 7 18 / 12%)',
        'e-500': '0 32px 80px rgb(3 7 18 / 16%)',
        'pressed-primary': '0 0 0 4px #C1BAF8',
        'pressed-black':   '0 0 0 4px #C1BAF8',
        'pressed-red':     '0 0 0 4px #F9CBCB',
      },
      fontFamily: {
        sans: ['Raleway','system-ui','-apple-system','Segoe UI','Roboto','Arial','Noto Sans','sans-serif'],
      },
      container: { center: true, padding: '1rem' },
    },
  },
  plugins: [],
}