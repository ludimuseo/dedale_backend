import { SvgProps } from '@/types'

const CheckIcon = ({ ...props }: SvgProps) => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="12" cy="12" r="12" fill="white" />
      <path
        d="M7 12.5L10.5 16L17.5 8"
        stroke="#22891F"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { CheckIcon }
