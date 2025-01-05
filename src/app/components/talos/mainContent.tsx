import React, { ReactElement } from 'react'

import { GameType, JourneyType, PieceType, PlaceType, StepType } from '@/types'

interface MainContentProps {
  onTextClick: () => void // Fonction appelée au clic sur un texte
  inputVisible?: boolean
  textColor?: string // Optionnel : Couleur du texte
  activeTextId?: boolean
  formData:
    | PlaceType
    | JourneyType
    | StepType
    | PieceType
    | GameType
    | undefined
  sentencesData?: ReactElement[]
}

const MainContent: React.FC<MainContentProps> = ({
  sentencesData,
  onTextClick,
}) => {
  return (
    <div className="mt-4 h-auto rounded-md border-2 border-black bg-white p-6 shadow-2xl">
      <h2 className="mb-4 text-lg font-bold text-[#0a184d]">Je lis :</h2>
      <div className="space-y-4" onClick={onTextClick}>
        {sentencesData && sentencesData}
      </div>
    </div>
  )
}

export default MainContent
