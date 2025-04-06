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

import { ChangeFontSizeBar } from '../ChangeFontSizeBar'
import { MainContent } from './MainContent'
import { Sentence } from './TalosInterfaceMain'

interface LeftClipboardProps {
  isLeftClipboardShowed: boolean
  showProofReading: boolean
  falcText: Sentence[]
  formData: EntityWithId<
    PlaceType | JourneyType | StepType | PieceType | GameType
  >
  sentencesData: ReactElement[]
  handleChangeFontSize: (newCounter: number) => void
  fontSize: number
}

const LeftClipboard: FC<LeftClipboardProps> = ({
  isLeftClipboardShowed,
  showProofReading,
  falcText,
  formData,
  sentencesData,
  handleChangeFontSize,
  fontSize,
}) => {
  const handleDecreaseFontSize = () => {
    if (fontSize === 0) return
    handleChangeFontSize(fontSize - 1)
  }

  const handleIncreaseFontSize = () => {
    if (fontSize === 5) return
    handleChangeFontSize(fontSize + 1)
  }
  return (
    <>
      {/* Main Content SECTION GAUCHE */}
      <div
        className={
          isLeftClipboardShowed
            ? 'mt-4 w-full border-r border-gray-300 pr-4 lg:flex lg:w-1/2 lg:gap-1'
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
                    {falcText.map((sentenceObject: Sentence, index: number) => {
                      return (
                        <motion.div
                          key={sentenceObject.id}
                          animate={{ opacity: 1 }}
                          initial={{ opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.3 + index * 0.3,
                            ease: 'linear',
                          }}>
                          <p className="text-xl text-sky-950">
                            {sentenceObject.sentence}
                          </p>
                        </motion.div>
                      )
                    })}
                  </div>
                }
              </motion.div>
            </>
          )}
          {!showProofReading && (
            <>
              <MainContent formData={formData} sentencesData={sentencesData} />
              <ChangeFontSizeBar
                handleDecreaseFontSize={handleDecreaseFontSize}
                handleIncreaseFontSize={handleIncreaseFontSize}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export { LeftClipboard }
