import { API_BASE_URL } from '@/config/config'
import { ClientType } from '@/types'

import { fetchWithAuth } from './fetchWithAuth'

export interface ClientResponse {
  clients: ClientType[]
}

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
    const data = (await response.json()) as ClientResponse
    const clientData = data.clients
    const filteredClientIsActive = clientData.filter((item) => item.isActive)
    return [...filteredClientIsActive]
  } catch (error) {
    console.log('ERROR fetching clients: ', error)
  }
}
