import { useAppSelector, useNotification } from '@hook/index'
import { StateAuth } from '@service/redux/slices/reducerAuth'
import type { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router'

import type { State } from '@/types'

type RouteGuestProps = PropsWithChildren

const RouteGuest = ({ children }: RouteGuestProps) => {
  const { t } = useTranslation()
  const { push } = useNotification()
  const { user }: StateAuth = useAppSelector((state: State) => state.auth)
  const isLogged: boolean = useAppSelector(
    (state: State) => state.auth.isLogged
  )
  if (!isLogged) {
    return children
  } else {
    const username: string = user?.pseudo ?? 'N/A'
    push(t('warning.auth', { user: username }), { type: 'warning' })
    return <Navigate to={{ pathname: '/' }} replace />
  }
}

export default RouteGuest
