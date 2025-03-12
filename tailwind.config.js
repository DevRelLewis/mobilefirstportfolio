/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#e6c0f6',
          200: '#b3abf3',
          300: '#9420a6',
          400: '#754fa0',
          500: '#5521b5',
          600: '#6d28d9',
          700: '#7c3aed'
        }
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive']
      },
      animation: {
        'bounce': 'bounce 1s infinite',
        'pulse': 'pulse 3s infinite alternate',
        'float': 'float 6s infinite ease-in-out',
        'fadeOut': 'fadeOut 1.5s forwards',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeOut: {
          'from': { opacity: '1' },
          'to': { opacity: '0' },
        }
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(to bottom, #9420a6 30%, #b3abf3 80%, #e6c0f6 100%)'
      }
    }
  },
  plugins: []
}