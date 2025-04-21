import { useState } from 'react'

import { DescriptionType } from '@/types'

export const useDescriptions = (newIdFromApi?: number) => {
  const [descriptions, setDescriptions] = useState<DescriptionType[]>([
    {
      id: Date.now(),
      collectionId: newIdFromApi ?? 0,
      language: 'fr',
      order: 0,
      text: '',
      isFalc: false,
      isCertifiedFalc: false,
      image: {
        file: '',
        alt: '',
      },
      audio: {
        file: '',
        audio_desc: '',
      },
    },
  ])

  return {
    descriptions,
    setDescriptions,
  }
}
