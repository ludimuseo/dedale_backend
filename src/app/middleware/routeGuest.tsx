import { useAppSelector } from '@hook/index'
import type { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router'

import type { State } from '@/types'

type RouteGuestProps = PropsWithChildren

const RouteGuest = ({ children }: RouteGuestProps) => {
  const navigate = useNavigate()
  const isLogged: boolean = useAppSelector(
    (state: State) => state.auth.isLogged
  )
  if (!isLogged) {
    return children
  } else {
    return navigate({ pathname: '/' }, { replace: true })
  }
}

export default RouteGuest
