import tailwind3dtransforms from '@xpd/tailwind-3dtransforms'
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  plugins: [tailwind3dtransforms],
  theme: {
    extend: {},
  },
} satisfies Config
