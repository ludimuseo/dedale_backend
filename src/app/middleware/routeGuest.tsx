import { useAppSelector } from '@hook/index'
import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

import type { State } from '@/types'

type RouteGuestProps = PropsWithChildren

const RouteGuest = ({ children }: RouteGuestProps) => {
  const isLogged: boolean = useAppSelector(
    (state: State) => state.auth.isLogged
  )
  if (!isLogged) return children
  else return <Navigate to={{ pathname: '/' }} replace />
}

export default RouteGuest
