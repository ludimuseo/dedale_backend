import { useAppSelector } from '@hook/index'
import type { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router'

import type { State, User } from '@/types'

type RouteAuthProps = PropsWithChildren & {
  role: User['role'] | null | undefined
}

const RouteAuth = ({ role, children }: RouteAuthProps) => {
  const navigate = useNavigate()
  const isLogged: boolean = useAppSelector(
    (state: State) => state.auth.isLogged
  )
  console.info('User role: ', role)
  if (isLogged) {
    return children
  } else {
    return navigate({ pathname: '/auth/signin' }, { replace: true })
  }
}

export default RouteAuth
