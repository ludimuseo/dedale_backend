import { useAppSelector } from '@hook'
import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

import type { State } from '@/types'

const RouteGuest = ({ children }: PropsWithChildren) => {
  const { isLogged } = useAppSelector((state: State) => state.auth)

  if (!isLogged) return children
  else return <Navigate to={{ pathname: '/' }} replace />
}

export default RouteGuest
