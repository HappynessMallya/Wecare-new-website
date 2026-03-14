import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 2026 brand: rose, blue, orange, azure
        primary: '#0A3487',
        rose: '#E6399A',
        azure: '#25abec',
        orange: '#df4917',
        cta: '#DF4917',
        'maya-blue': '#80BFEC',
        'rose-15': '#ffd9ee',
        'blue-30': '#d0daf5',
        'orange-30': '#ffe5dc',
        'azure-25': '#d4f0fc',
        off: '#f9f8f6',
        neutral: {
          50: '#fafafa',
          100: '#f3f4f6',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#9ca3af',
          600: '#4b5563',
          700: '#404040',
          800: '#1f2937',
          900: '#171717',
        },
      },
      fontFamily: {
        display: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
        sans: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      borderRadius: {
        card: '12px',
        button: '8px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        'nav': 'var(--nav-h)',
      },
      minHeight: {
        nav: 'var(--nav-h)',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        ticker: 'ticker 22s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
