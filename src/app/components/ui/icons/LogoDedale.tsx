import { useAppSelector } from '@hook/index'
import { StateTheme } from '@service/redux/slices/reducerTheme'
import type { ComponentProps } from 'react'

import logoDedaleDark from '@/assets/imgs/logoDedale_dark.webp'
import logoDedaleLight from '@/assets/imgs/logoDedale_light.webp'
import type { State } from '@/types'

type LogoDedaleProps = ComponentProps<'img'> & {
  width: number
}

const LogoDedale = ({ width }: LogoDedaleProps) => {
  const { isDark }: StateTheme = useAppSelector((state: State) => state.theme)
  const imgData: string = isDark ? logoDedaleDark : logoDedaleLight
  return (
    <>
      <figure>
        <img height="auto" width={width} src={imgData} alt="logo" />
      </figure>
    </>
  )
}

export { LogoDedale }
