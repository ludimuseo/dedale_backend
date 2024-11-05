import { type ComponentProps } from 'react'

import { useAppSelector } from '@/app/hooks'
import logoDedale2 from '@/assets/imgs/logoDedale_v1.webp'
import logoDedale1 from '@/assets/imgs/logoDedale_v2.webp'
import { type State } from '@/types'

type DedaleLogoProps = ComponentProps<'img'> & {
  width: number
}

const DedaleLogo = ({ width }: DedaleLogoProps) => {
  const isDark: boolean = useAppSelector((state: State) => state.theme.isDark)
  return (
    <>
      <figure>
        <img
          height="auto"
          width={width}
          src={isDark ? logoDedale1 : logoDedale2}
          alt="logo"
        />
      </figure>
    </>
  )
}

export default DedaleLogo
