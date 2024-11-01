import { Navigate } from 'react-router-dom'
import { type PropsWithChildren } from 'react'
import { type State } from '@/types'
import { useAppSelector } from '@/app/hooks'

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
