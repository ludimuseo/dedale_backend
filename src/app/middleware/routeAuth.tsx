import { useAppSelector, useNotification } from '@hook/index'
import type { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router'

import type { State, User } from '@/types'

type RouteAuthProps = PropsWithChildren & {
  role: User['role'] | null | undefined
}

const RouteAuth = ({ role, children }: RouteAuthProps) => {
  const { t } = useTranslation()
  const { push } = useNotification()
  const isLogged: boolean = useAppSelector(
    (state: State) => state.auth.isLogged
  )
  console.info('User role: ', role)
  if (isLogged) {
    return children
  } else {
    push(t('warning.guest'), { type: 'warning' })
    return <Navigate to={{ pathname: '/auth/signin' }} replace />
  }
}

export default RouteAuth
