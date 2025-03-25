import { useAppSelector } from '@hook'
import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

import PageUnauthorized from '@/app/pages/PageUnauthorized'
import type { RouteRolesCondition, State, UserRole } from '@/types'

const RouteAuth = ({
  roles,
  children,
}: PropsWithChildren<RouteRolesCondition>) => {
  const { isLogged, user } = useAppSelector((state: State) => state.auth)

  if (isLogged && user) {
    const userRole: UserRole = user.role
    if (
      roles == null ||
      roles.allow?.includes(userRole) ||
      !roles.deny?.includes(userRole)
    ) {
      return children
    } else {
      return <PageUnauthorized />
    }
  } else {
    return <Navigate to={{ pathname: '/auth/signin' }} replace />
  }
}

export default RouteAuth
