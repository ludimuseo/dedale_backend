/** @type {import('tailwindcss').Config} */
import tailwind3dtransforms from '@xpd/tailwind-3dtransforms'
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {},
  darkMode: 'selector',
  plugins: [tailwind3dtransforms, typography, daisyui],
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
      },
      textColor: {
        default: 'var(--color-primary)',
      },
    },
    fontFamily: {
      satoshi: ['Satoshi', 'sans-serif'],
    },
  },
}
