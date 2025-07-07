import { useQuery } from '@tanstack/react-query'

import { fetchClient } from '@/api/fetchClient'

export const useClients = (token: string) => {
  return useQuery({
    queryKey: ['clients', token],
    queryFn: () => fetchClient(token),
    enabled: !!token,
  })
}
