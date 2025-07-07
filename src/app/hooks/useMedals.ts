import { useQuery } from '@tanstack/react-query'

import { fetchMedals } from '@/api/fetchMedals'

export const useMedals = (token: string) => {
  return useQuery({
    queryKey: ['medals', token],
    queryFn: () => fetchMedals(token),
    enabled: !!token,
  })
}
