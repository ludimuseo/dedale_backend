import { type PropsWithChildren } from 'react'
import { useAppSelector } from '@/app/hooks'
import { type State } from '@/types'
import { Navigate } from 'react-router-dom'

type RouteGuestProps = PropsWithChildren

const RouteGuest = ({ children }: RouteGuestProps) => {
  const isLogged: boolean = useAppSelector(
    (state: State) => state.auth.isLogged
  )
  if (!isLogged) {
    return children
  } else {
    return <Navigate to={{ pathname: '/' }} replace />
  }
}

export default RouteGuest
