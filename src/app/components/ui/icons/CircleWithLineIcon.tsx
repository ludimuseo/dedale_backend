import { SvgProps } from '@/types'

import { LineIcon } from './LineIcon'

type ExtendedSvgProps = SvgProps & {
  index: number
  currentStep: number
}

const CircleWithLineIcon = ({
  index,
  currentStep,
  ...props
}: ExtendedSvgProps) => {
  return (
    <>
      <svg height="100" width="200" key={index} {...props}>
        <circle
          cx="70"
          cy="50"
          r="25"
          stroke="#4AD87E"
          strokeWidth="1"
          fill="#4AD87E"
          xmlns="http://www.w3.org/2000/svg"
        />
        <path
          d="M55 50 L65 60 L85 40"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {
          //ligne
          currentStep !== index && <LineIcon />
        }
      </svg>
    </>
  )
}

export { CircleWithLineIcon }
