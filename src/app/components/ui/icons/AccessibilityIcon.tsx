import { SvgProps } from '@/types'

const AccessibilityIcon = ({ ...props }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}>
      <path d="M12 2a2 2 0 110 4 2 2 0 010-4zm7 5h-4a1 1 0 00-1 1v1h-4V8a1 1 0 00-1-1H5a1 1 0 000 2h3v2a1 1 0 00.38.78L10 14v6a1 1 0 002 0v-5h2v5a1 1 0 002 0v-6l1.62-1.22A1 1 0 0016 12V10h3a1 1 0 100-2z" />
    </svg>
  )
}

export default AccessibilityIcon
