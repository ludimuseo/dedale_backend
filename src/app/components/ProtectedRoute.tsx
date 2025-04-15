import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { isTokenExpired } from '@/utils/auth'

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const [isValid, setIsValid] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token')
      void navigate('/login', { replace: true })
    } else {
      setIsValid(true)
    }
  }, [navigate])

  if (isValid === null) return null // ou un loader
  return isValid ? children : null
}
