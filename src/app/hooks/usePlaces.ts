import { useQuery } from '@tanstack/react-query'

import { fetchPlaces } from '@/api/fetchPlaces'

export const usePlaces = (selectedClientId: number, token: string) => {
  return useQuery({
    queryKey: ['places', token],
    queryFn: () => fetchPlaces(selectedClientId, token),
    enabled: !!selectedClientId && !!token,
    staleTime: 1000 * 60 * 5, // cache 5 minutes
    refetchOnWindowFocus: false,
  })
}
