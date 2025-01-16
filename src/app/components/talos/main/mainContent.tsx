import React, { ReactElement } from 'react'

import { GameType, JourneyType, PieceType, PlaceType, StepType } from '@/types'

interface MainContentProps {
  formData:
    | PlaceType
    | JourneyType
    | StepType
    | PieceType
    | GameType
    | undefined
  sentencesData?: ReactElement[]
}

const MainContent: React.FC<MainContentProps> = ({ sentencesData }) => {
  return (
    <div className="mt-4 h-auto rounded-md border-2 border-black bg-white p-4 shadow-2xl">
      {sentencesData && (
        <>
          <h2 className="mb-4 text-2xl font-bold text-primary">Je lis :</h2>
          <div className="space-y-4">{sentencesData}</div>
        </>
      )}
    </div>
  )
}

export default MainContent
