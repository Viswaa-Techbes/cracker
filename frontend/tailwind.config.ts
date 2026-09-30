import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        festive: {
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#FFB300', // Gold accent
          600: '#FB8C00', // Deep Orange
          700: '#E65100', // Fiery Spark
          800: '#BF360C', // Crimson Flame
          900: '#7F1D1D', // Deep Festive Red
        },
        navy: {
          800: '#0F172A',
          900: '#090D16',
          950: '#040711',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sparkle: '0 4px 20px -2px rgba(230, 81, 0, 0.25)',
        gold: '0 4px 20px -2px rgba(255, 179, 0, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
