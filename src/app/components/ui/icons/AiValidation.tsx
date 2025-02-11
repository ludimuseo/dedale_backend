import { SvgProps } from '@/types'

const AiValidationIcon = ({ ...props }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 268.9 268.85"
      width={35}
      height={32}
      {...props}>
      <path
        d="M142.32,268.85H126.56a12.86,12.86,0,0,0-2-.43A123.84,123.84,0,0,1,77.41,256.1C36.17,235.78,10.94,203,2.12,157.82c-1-5.11-1.43-10.34-2.12-15.51V126.56a19.8,19.8,0,0,0,.45-2.27c1.3-18.76,6.17-36.59,15.37-52.95,24.76-44,62.53-68,113-71.1A124.6,124.6,0,0,1,203,18.92c40.81,25.16,62.87,62,65.7,109.84a125.18,125.18,0,0,1-15.57,68.69q-31.28,56.88-95.23,69.28C152.74,267.71,147.5,268.16,142.32,268.85Z"
        fill="#4caf4c"
      />
      <text
        x="134"
        y="150"
        fontSize="100"
        fontWeight="bold"
        fill={'#0a184d'}
        textAnchor="middle"
        dominantBaseline="middle">
        AI
      </text>
    </svg>
  )
}

export default AiValidationIcon
