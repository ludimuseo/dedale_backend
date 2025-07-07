import { useState } from 'react'

export const useSelectedId = () => {
  const [selected, setSelected] = useState<Record<string, number>>({
    selectedClientId: 0,
    selectedPlaceId: 0,
    selectedJourneyId: 0,
    selectedStepId: 0,
    selectedPieceId: 0,
    selectedMedalId: 0,
  })

  return {
    selected,
    setSelected,
  }
}
