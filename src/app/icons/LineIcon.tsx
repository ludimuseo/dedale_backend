import { SvgProps } from '@/types'

export const LineIcon = ({ ...props }: SvgProps) => {
  return (
    <>
      <svg height="100" width="200" {...props}>
        <line x1="75" y1="50" x2="240" y2="50" stroke="grey" strokeWidth="1" />
      </svg>
    </>
  )
}
