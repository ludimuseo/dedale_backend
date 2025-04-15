import { isTokenExpired } from '@/utils/auth'

export const useAuthCheck = () => {
  const checkToken = (token: string) => {
    if (!token || isTokenExpired(token)) {
      window.location.href = '/login'
      return false
    }
    return true
  }
  return { checkToken }
}
