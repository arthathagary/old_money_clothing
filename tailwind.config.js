/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F7F4EF',
          soft: '#EFECE6',
          warm: '#E6E0D5',
        },
        obsidian: {
          DEFAULT: '#0F0E0C',
          card: '#171512',
          elevated: '#211E1A',
        },
        heritage: {
          green: '#1B352A',
          emerald: '#274E3E',
          sage: '#8FA395',
        },
        champagne: {
          DEFAULT: '#C5A059',
          light: '#DFC286',
          dark: '#9B7A38',
        },
        stone: {
          muted: '#7A7369',
          light: '#A8A096',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      boxShadow: {
        luxury: '0 25px 60px -15px rgba(15, 14, 12, 0.14)',
        'luxury-dark': '0 25px 60px -15px rgba(0, 0, 0, 0.65)',
        'gold-glow': '0 0 35px -5px rgba(197, 160, 89, 0.35)',
      },
    },
  },
  plugins: [],
};
