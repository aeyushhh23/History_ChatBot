/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand palette — warm bronze/gold historica accent
        accent: {
          50:  '#fdf8f0',
          100: '#faecd8',
          200: '#f3d5ab',
          300: '#e8b874',
          400: '#d49a4e',
          500: '#c4832f',  // Primary accent
          600: '#a66a24',
          700: '#875221',
          800: '#6e4020',
          900: '#5c351e',
          950: '#341a0e',
        },
        // Burgundy secondary
        burgundy: {
          50:  '#fdf2f4',
          100: '#fce7ea',
          200: '#f8d1d8',
          300: '#f2adb9',
          400: '#e97d93',
          500: '#dc5070',
          600: '#c22e54',
          700: '#9f2244',  // Primary burgundy
          800: '#872040',
          900: '#741e3c',
          950: '#410c1e',
        },
        // Ivory/parchment surfaces
        parchment: {
          50:  '#fefdfb',
          100: '#fdf9f3',
          200: '#f9f0e3',
          300: '#f3e3cc',
          400: '#e8cfaa',
          500: '#dbb888',
        },
        // Deep foundation palette
        ink: {
          50:  '#f4f5f7',
          100: '#e3e5ea',
          200: '#c9cdd6',
          300: '#a3aab8',
          400: '#757e91',
          500: '#5a6376',
          600: '#4d5464',
          700: '#424854',
          800: '#393e48',
          850: '#282c35',
          900: '#1a1d24',  // Primary bg
          925: '#141619',
          950: '#0d0f12',  // Deepest
        },
      },
      fontFamily: {
        serif:    ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display:  ['"Playfair Display"', 'Georgia', 'serif'],
        sans:     ['"Inter"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      animation: {
        'fade-in':       'fadeIn 0.4s ease-out forwards',
        'fade-in-up':    'fadeInUp 0.5s ease-out forwards',
        'fade-in-down':  'fadeInDown 0.3s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.3s ease-out forwards',
        'slide-in-right':'slideInRight 0.3s ease-out forwards',
        'msg-in':        'msgIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer':       'shimmer 2s infinite linear',
        'pulse-gentle':  'pulseGentle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typing-dot':    'typingDot 1.4s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        msgIn: {
          '0%':   { opacity: '0', transform: 'translateY(8px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
        typingDot: {
          '0%, 60%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '30%':           { opacity: '1',   transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
