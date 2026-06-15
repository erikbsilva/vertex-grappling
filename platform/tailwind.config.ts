import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4A820',
          light: '#E2BA35',
          dark: '#B8901A',
        },
        navy: {
          DEFAULT: '#07091A',
          100: '#0D1028',
          200: '#111535',
          300: '#151A3F',
          400: '#1A2040',
        },
        danger: {
          DEFAULT: '#E5484D',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

export default config
