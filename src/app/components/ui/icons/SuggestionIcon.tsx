import { SvgProps } from '@/types'

export const SuggestionIcon = ({ ...props }: SvgProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" {...props}>
      <circle
        cx="160"
        cy="160"
        r="150"
        fill="#f4fdff"
        stroke="#0a184d"
        strokeWidth="12"
      />
      <path
        d="M90 120c0-20 20-35 45-35h70c25 0 45 15 45 35v45c0 20-20 35-45 35h-20l-30 25v-25h-15c-25 0-45-15-45-35z"
        fill="none"
        stroke="#0a184d"
        strokeWidth="12"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="130" cy="145" r="8" fill="#0a184d" />
      <circle cx="160" cy="145" r="8" fill="#0a184d" />
      <circle cx="190" cy="145" r="8" fill="#0a184d" />
    </svg>
  )
}

export default SuggestionIcon
