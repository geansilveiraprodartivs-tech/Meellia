/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff5f8',
          100: '#ffe4ee',
          200: '#ffc9dd',
          300: '#ffa6c5',
          400: '#ff7faa',
          500: '#f96a96',
          600: '#e0527c',
          700: '#b83d62',
          800: '#8f2f4d',
          900: '#6b2439',
        },
        lilac: {
          50: '#f7f4ff',
          100: '#ece4ff',
          200: '#d9c9ff',
          300: '#c0a8ff',
          400: '#a385f5',
          500: '#8b6ee0',
          600: '#7157bf',
          700: '#5a4599',
          800: '#453676',
          900: '#322653',
        },
        sky: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#c5e2ff',
          300: '#9ccbff',
          400: '#6aa9f5',
          500: '#4a8fe0',
          600: '#3870b8',
          700: '#2c5790',
          800: '#224470',
          900: '#193250',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Quicksand', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgba(192, 120, 160, 0.18)',
        card: '0 8px 30px -12px rgba(192, 120, 160, 0.22)',
        glow: '0 0 0 4px rgba(255, 166, 197, 0.18)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%,100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'pop-in': 'pop-in 0.35s ease-out both',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
