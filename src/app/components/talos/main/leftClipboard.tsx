import { ReactElement } from 'react'

import {
  EntityWithId,
  GameType,
  JourneyType,
  PieceType,
  PlaceType,
  StepType,
} from '@/types'

import MainContent from './mainContent'

interface LeftClipboard {
  isLeftClipboardShowed: boolean
  showProofReading: boolean
  falcText: string[]
  formData: EntityWithId<
    PlaceType | JourneyType | StepType | PieceType | GameType
  >
  sentencesData: ReactElement[]
}

const LeftClipboard = ({
  isLeftClipboardShowed,
  showProofReading,
  falcText,
  formData,
  sentencesData,
}: LeftClipboard) => {
  return (
    <>
      {/* Main Content SECTION GAUCHE */}

      <div
        className={
          isLeftClipboardShowed
            ? 'w-1/2 border-r border-gray-300 pr-4'
            : 'w-full'
        }>
        {showProofReading && (
          <>
            <div className="mt-4 h-auto rounded-md border-2 border-black bg-white p-6 shadow-2xl">
              <h2 className="mb-4 text-2xl font-bold text-[#0a184d]">
                Je relis :
              </h2>
              {
                <div className="space-y-4">
                  {falcText.map((sentence: string, index: number) => {
                    return (
                      <div key={index}>
                        <p className="text-xl text-sky-950">{sentence}</p>
                      </div>
                    )
                  })}
                </div>
              }
            </div>
          </>
        )}
        {!showProofReading && (
          <MainContent formData={formData} sentencesData={sentencesData} />
        )}
      </div>
    </>
  )
}

export default LeftClipboard
