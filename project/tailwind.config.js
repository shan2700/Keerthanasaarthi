/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF8E6',
          100: '#F8F1CD',
          200: '#F1E49B',
          300: '#EAD769',
          400: '#E3C937',
          500: '#D4AF37', // primary gold
          600: '#B78E24',
          700: '#8A6D1B',
          800: '#5D4B12',
          900: '#302609',
        },
        cream: {
          50: '#FFFCF5',
          100: '#FFF8E1', // primary cream
          200: '#FFE9B0',
          300: '#FFD97F',
          400: '#FFC94E',
          500: '#FFB91D',
          600: '#DB9000',
          700: '#A46B00',
          800: '#6D4700',
          900: '#362300',
        },
        charcoal: {
          50: '#EAEAEA',
          100: '#D5D5D5',
          200: '#ABABAB',
          300: '#808080',
          400: '#575757',
          500: '#333333', // primary charcoal
          600: '#2B2B2B',
          700: '#232323',
          800: '#1A1A1A',
          900: '#0D0D0D',
        },
        burgundy: {
          50: '#F5E6E8',
          100: '#EBCCD1',
          200: '#D799A3',
          300: '#C46676',
          400: '#B03348',
          500: '#800020', // primary burgundy
          600: '#6C001B',
          700: '#580016',
          800: '#440011',
          900: '#22000B',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};