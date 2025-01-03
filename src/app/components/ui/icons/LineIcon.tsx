import { SvgProps } from '@/types'

const LineIcon = ({ ...props }: SvgProps) => {
  return (
    <>
      <svg height="200" width="250" {...props}>
        <line x1="95" y1="50" x2="350" y2="50" stroke="grey" strokeWidth="1" />
      </svg>
    </>
  )
}

export { LineIcon }
