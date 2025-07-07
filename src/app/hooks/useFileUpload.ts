import { MouseEvent } from 'react'

import { fetchWithAuth } from '@/api/fetchWithAuth'
import { API_BASE_URL } from '@/config/config'
import { FormDataType } from '@/types'

type SetFormDataType = React.Dispatch<React.SetStateAction<FormDataType>>

export const useFileUpload = (token: string, setFormData: SetFormDataType) => {
  const handleFileUpload = async (
    file: File,
    fileType: string,
    imgName: string | undefined,
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault()

    const formUpload = new FormData()
    // Ajout des données dans formUpload
    formUpload.append('file', file) // le fichier image à uploader
    formUpload.append('type', 'image') // type : image ou audio
    formUpload.append('destination', 'Place') // ou journey, step, etc.

    setFormData((prevFormData) => ({
      ...prevFormData,
      [fileType]: imgName,
    }))

    try {
      const response: Response = await fetchWithAuth(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formUpload, // Attention : pas de Content-Type ici, FormData le gère
      })

      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status.toString()}`)
      }
      const data: unknown = await response.json()
      console.log('Fichier uploadé avec succès :', data)
    } catch (error) {
      console.error("Erreur lors de l'upload :", error)
      throw error
    }
  }

  return {
    handleFileUpload,
  }
}
