import { useAppSelector } from '@hook'
import { Navigate } from 'react-router'

import type { State } from '@/types'
import { isTokenExpired } from '@/utils/auth'

const RouteAuth = ({
  children /* role = null */,
}: {
  children: React.ReactNode
  role?: string | null
}) => {
  const { token, isLogged } = useAppSelector((state: State) => state.auth)

  if (!token || isTokenExpired(token) || !isLogged) {
    //alert("Votre token est expiré")
    return <Navigate to={{ pathname: '/auth/signin' }} replace />
  }
  return <>{children}</>
}
//TODO:

// Optionnel : vérification du rôle si nécessaire
// if (role && !userHasRole(role)) return <Navigate to="/unauthorized" />

export default RouteAuth
