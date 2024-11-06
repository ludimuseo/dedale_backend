import tailwind3dtransforms from '@xpd/tailwind-3dtransforms'
import { type Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  plugins: [tailwind3dtransforms],
  theme: {
    extend: {
      backgroundColor: {
        button: 'var(--color-bg-button)',
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        tertiary: 'var(--color-bg-tertiary)',
      },
      textColor: {
        button: 'var(--color-text-button)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        tertiary: 'var(--color-text-tertiary)',
      },
    },
    fontFamily: {
      satoshi: ['Satoshi', 'sans-serif'],
    },
  },
}

export default config
