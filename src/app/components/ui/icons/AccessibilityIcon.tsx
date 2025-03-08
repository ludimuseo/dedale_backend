import { SvgProps } from '@/types'

const AccessibilityIcon = ({ ...props }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="192"
      height="192"
      {...props}>
      <circle cx="32" cy="32" r="30" fill="#007acc" />

      <path
        d="M32 20a4 4 0 0 0-4 4v8h-6v-4a2 2 0 0 0-4 0v4h-2a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-8h6v4a2 2 0 0 0 4 0v-4h2a4 4 0 0 0 4-4v-8a4 4 0 0 0-4-4h-8z"
        fill="#fff"
      />
      <circle cx="20" cy="44" r="4" fill="#007acc" />
      <circle cx="44" cy="44" r="4" fill="#007acc" />

      <circle cx="32" cy="16" r="4" fill="#fff" />
      <path d="M32 20a4 4 0 0 0-4 4v4h8v-4a4 4 0 0 0-4-4z" fill="#fff" />
    </svg>
  )
}

export default AccessibilityIcon
