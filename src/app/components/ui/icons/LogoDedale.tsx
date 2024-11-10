import type { ComponentProps } from 'react'

import { useAppSelector } from '@/app/hooks'
import logoDedale2 from '@/assets/imgs/logoDedale_v1.webp'
import logoDedale1 from '@/assets/imgs/logoDedale_v2.webp'
import type { State } from '@/types'

type LogoDedaleProps = ComponentProps<'img'> & {
  width: number
  forceDark?: boolean | null
}

const LogoDedale = ({ width, forceDark }: LogoDedaleProps) => {
  const isDark: boolean = useAppSelector((state: State) => state.theme.isDark)
  const imgData: string = forceDark
    ? logoDedale1
    : isDark
      ? logoDedale1
      : logoDedale2
  return (
    <>
      <figure>
        <img height="auto" width={width} src={imgData} alt="logo" />
      </figure>
    </>
  )
}

export { LogoDedale }
