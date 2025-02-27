import { AnimatePresence, motion } from 'framer-motion'
import { type FC, ReactElement } from 'react'

import {
  EntityWithId,
  GameType,
  JourneyType,
  PieceType,
  PlaceType,
  StepType,
} from '@/types'

import { MainContent } from './MainContent'

interface LeftClipboardProps {
  isLeftClipboardShowed: boolean
  showProofReading: boolean
  falcText: string[]
  formData: EntityWithId<
    PlaceType | JourneyType | StepType | PieceType | GameType
  >
  sentencesData: ReactElement[]
}

const LeftClipboard: FC<LeftClipboardProps> = ({
  isLeftClipboardShowed,
  showProofReading,
  falcText,
  formData,
  sentencesData,
}) => {
  return (
    <>
      {/* Main Content SECTION GAUCHE */}
      <div
        className={
          isLeftClipboardShowed
            ? 'w-1/2 border-r border-gray-300 pr-4'
            : 'w-full'
        }>
        <AnimatePresence>
          {showProofReading && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: 'linear' }}
                className="mt-4 h-auto rounded-md border-2 border-black bg-white p-6 shadow-2xl">
                <h2 className="mb-4 text-2xl font-bold text-[#0a184d]">
                  Je relis :
                </h2>
                {
                  <div className="space-y-4">
                    {falcText.map((sentence: string, index: number) => {
                      return (
                        <motion.div
                          key={index}
                          animate={{ opacity: 1 }}
                          initial={{ opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.3 + index * 0.3,
                            ease: 'linear',
                          }}>
                          <p className="text-xl text-sky-950">{sentence}</p>
                        </motion.div>
                      )
                    })}
                  </div>
                }
              </motion.div>
            </>
          )}
          {!showProofReading && (
            <MainContent formData={formData} sentencesData={sentencesData} />
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export { LeftClipboard }
