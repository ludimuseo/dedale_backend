// src/api/fetchWithAuth.ts
export const fetchWithAuth = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  // 1. Exécuter la requête originale
  const response = await fetch(input, init)

  // 2. Intercepter les erreurs 401
  if (response.status === 401) {
    alert('Token expiré, vous devez vous reconnecter.')
    window.location.href = '/'
    throw new Error('Session expirée, veuillez vous reconnecter.')
  }

  return response
}
