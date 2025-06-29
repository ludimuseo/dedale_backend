import { API_BASE_URL } from '@/config/config'
import { MedalType } from '@/types'

import { fetchWithAuth } from './fetchWithAuth'

export const fetchMedals = async (token: string) => {
  try {
    const response: Response = await fetchWithAuth(
      `${API_BASE_URL}/medals/list`,
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
    const data = (await response.json()) as MedalType[]
    const medalData = data
    return [...medalData]
  } catch (error: unknown) {
    console.error(
      'ERROR fetching clients:',
      error instanceof Error ? error.message : String(error)
    )
  }
}
