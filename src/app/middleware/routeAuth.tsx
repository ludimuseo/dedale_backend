import { useAppSelector } from '@hook/index'
import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

import type { State, User } from '@/types'

interface RouteAuthProps {
  role: User['role'] | null | undefined
}

const RouteAuth = ({ role, children }: PropsWithChildren<RouteAuthProps>) => {
  const isLogged: boolean = useAppSelector(
    (state: State) => state.auth.isLogged
  )
  console.info('User role: ', role)
  if (isLogged) return children
  else return <Navigate to={{ pathname: '/auth/signin' }} replace />
}

export default RouteAuth
