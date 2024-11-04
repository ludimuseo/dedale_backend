import tailwind3dtransforms from '@xpd/tailwind-3dtransforms'
import { type Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  plugins: [tailwind3dtransforms],
  theme: {
    extend: {
      colors: {
        button: 'var(--color-buttons)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        typography: 'var(--color-typography)',
      },
    },
    fontFamily: {
      satoshi: ['Satoshi', 'sans-serif'],
    },
  },
}

export default config
