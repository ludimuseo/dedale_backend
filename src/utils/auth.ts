export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as { exp: number } //on dit à TypeScript que payload contient une propriété exp de type number
    if (typeof payload.exp !== 'number') return true
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}
