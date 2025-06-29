import { API_BASE_URL } from '@/config/config'
import { ClientType } from '@/types'

import { fetchWithAuth } from './fetchWithAuth'

export const fetchClient = async (token: string) => {
  try {
    const response: Response = await fetchWithAuth(
      `${API_BASE_URL}/clients/list`,
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
    const data = (await response.json()) as ClientType[]
    const clientData = data.clients as ClientType[]
    const filteredClientIsActive = clientData.filter((item) => item.isActive)
    return [...filteredClientIsActive]
  } catch (error) {
    console.log('ERROR fetching clients: ', error)
  }
}
