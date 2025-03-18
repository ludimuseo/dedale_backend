import { useAppSelector } from '@hook'
import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

import type { State, UserRole } from '@/types'

const RouteAuth = ({
  role,
  children,
}: PropsWithChildren<{ role: UserRole }>) => {
  const { isLogged } = useAppSelector((state: State) => state.auth)
  console.info('User role: ', role)
  if (isLogged) return children
  else return <Navigate to={{ pathname: '/auth/signin' }} replace />
}

export default RouteAuth
