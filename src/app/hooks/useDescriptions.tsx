import { useState } from 'react'

import { DescriptionType } from '@/types'

import { generateUniqueId } from '../services/utils/generateId'

export const useDescriptions = (newIdFromApi: number, collection: string) => {
  const [descriptions, setDescriptions] = useState<DescriptionType[]>([
    {
      id: generateUniqueId(),
      collection: collection,
      collectionId: newIdFromApi,
      language: 'fr',
      order: 0,
      text: '',
      isFalc: false,
      isCertifiedFalc: false,
      image: {
        file: '',
      },
      audio: {
        file: '',
      },
    },
  ])

  return {
    descriptions,
    setDescriptions,
  }
}
