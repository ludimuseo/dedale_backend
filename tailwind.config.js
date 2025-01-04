/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'
import tailwind3dtransforms from '@xpd/tailwind-3dtransforms'
import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: [
      {
        mytheme: {
          'primary': '#0A184D',
          'secondary': '#f6d860',
          'accent': '#37cdbe',
          'neutral': '#3d4451',
          'base-100': '#ffffff',

          'lightBlue': '#F4FDFF',
          'darkBlue': '#0A184D',
          'pink': '#FF8375',
          'yellow': '#FFD82A',
          'purple': '#3B071C',
          'blackContrast': '#24252D',
          'ivoryContrast': '#FFFFF4',
          'white': '#FFFFFF',
          'white4': '#fffff4',
          'whiteCream': '#F0FCFF',
          'red': '#FF0000',
        },
      },
      'dark',
      'cupcake',
    ],
  },
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
