import { type PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
import { type State } from '@/types'
import { type User } from '@/types/user'

type RouteAuthProps = PropsWithChildren & {
  role?: User['role'] | null
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
