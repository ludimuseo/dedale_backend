import { API_BASE_URL } from '@/config/config'
import { PlaceType } from '@/types'

import { fetchWithAuth } from './fetchWithAuth'

export const fetchPlaces = async (selectedClientId: number, token: string) => {
  if (!selectedClientId) return
  try {
    const response: Response = await fetchWithAuth(
      `${API_BASE_URL}/places/list/${selectedClientId.toString()}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${String(response.status)}`)
    }
    const data = (await response.json()) as PlaceType[]
    const placeData = data.places as PlaceType[]
    console.log('FETCHPLACES placeData: ', placeData)
    return placeData
  } catch (error) {
    console.log('ERROR fetching places: ', error)
    return []
  }
}
