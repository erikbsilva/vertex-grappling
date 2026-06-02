import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          DEFAULT: '#D4A820',
          light: '#E2BA35',
          dark: '#B8901A',
        },
        dark: {
          DEFAULT: '#07091A',
          100: '#0D1028',
          200: '#111535',
          300: '#151A3F',
          400: '#1A2040',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
