import { useAppDispatch, useAppSelector } from '@hook'
import { Navigate } from 'react-router'

//import { Navigate } from 'react-router'
import type { State } from '@/types'
import { isTokenExpired } from '@/utils/auth'

import { signOut } from '../services/redux/slices/reducerAuth'

const RouteAuth = ({
  children /* role = null */,
}: {
  children: React.ReactNode
  role?: string | null
}) => {
  const { token, isLogged } = useAppSelector((state: State) => state.auth)
  const dispatch = useAppDispatch()

  if (!token || isTokenExpired(token) || !isLogged) {
    dispatch(signOut())
    alert('Votre token est expiré, vous devez vous reconnecter')
    return <Navigate to={{ pathname: '/auth/signin' }} replace />
  }
  return <>{children}</>
}

//TODO:

// Optionnel : vérification du rôle si nécessaire
// if (role && !userHasRole(role)) return <Navigate to="/unauthorized" />

export default RouteAuth
