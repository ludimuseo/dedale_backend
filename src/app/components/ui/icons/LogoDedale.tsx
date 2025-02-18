import { useAppSelector } from '@hook'
import logoDedaleDark from '@img/logoDedale_dark.webp'
import logoDedaleLight from '@img/logoDedale_light.webp'
import { StateTheme } from '@service/redux/slices/reducerTheme'
import type { ComponentProps } from 'react'

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
