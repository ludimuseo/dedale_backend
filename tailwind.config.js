/** @type {import('tailwindcss').Config} */
import tailwind3dtransforms from '@xpd/tailwind-3dtransforms'
import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  plugins: [tailwind3dtransforms, daisyui],
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
  // daisyui: {
  //   themes: [
  //     {
  //       customtheme: {
  //         'primary': 'var(--color-bg-primary)',
  //         'secondary': 'var(--color-bg-secondary)',
  //         'accent': 'var(--color-bg-tertiary)',
  //         'neutral': '#3d4451',
  //         'base-100': '#ffffff',
  //         'info': '#3abff8',
  //         'success': '#36d399',
  //         'warning': '#fbbf24',
  //         'error': '#f87272',
  //       },
  //     },
  //   ],
  // },
}
