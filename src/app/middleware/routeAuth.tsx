import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

import { useAppSelector } from '@/app/hooks'
import type { State, User } from '@/types'

type RouteAuthProps = PropsWithChildren & {
  role: User['role'] | null | undefined
}

const RouteAuth = ({ role, children }: RouteAuthProps) => {
  const isLogged: boolean = useAppSelector(
    (state: State) => state.auth.isLogged
  )
  console.info('Role: ', role)
  if (isLogged) {
    return children
  } else {
    return <Navigate to={{ pathname: '/auth/signin' }} replace />
  }
}

export default RouteAuth
