import { SvgProps } from '@/types'

type ExtendedSvgProps = SvgProps & {
  index: number
  currentStep: number
}

export const CircleIcon = ({
  index,
  currentStep,
  ...props
}: ExtendedSvgProps) => {
  return (
    <svg height="100" width="100" key={index} {...props}>
      <circle
        cx="60"
        cy="50"
        r="25"
        stroke="#707785"
        strokeWidth="1"
        xmlns="http://www.w3.org/2000/svg"
        fill={currentStep + 1 === index + 1 ? '#0A184D' : 'white'}
      />
      <text
        x="60"
        y="52"
        fontSize="30"
        fontWeight={currentStep + 1 > index + 1 ? 'bold' : 'light'}
        fill={currentStep + 1 === index + 1 ? 'white' : '#707785'}
        textAnchor="middle"
        dominantBaseline="middle">
        {index + 1}
      </text>
    </svg>
  )
}
