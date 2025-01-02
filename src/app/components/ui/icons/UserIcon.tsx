import type { SvgProps } from '@/types'

const UserIcon = ({ ...props }: SvgProps) => {
  return (
    <>
      <svg
        width="100"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <circle cx="5" cy="8" r="5" fill="#0A184D" />
        <ellipse cx="5" cy="19" rx="8" ry="5" fill="#0A184D" />
      </svg>
    </>
  )
}

export { UserIcon }
