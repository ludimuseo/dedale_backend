import { motion } from 'framer-motion'
import { type FC, ReactElement } from 'react'

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

const MainContent: FC<MainContentProps> = ({ sentencesData }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'linear' }}
      className="mt-4 h-auto rounded-md border-2 border-black bg-white p-4 shadow-2xl">
      {sentencesData && (
        <>
          <h2 className="mb-4 text-2xl font-bold text-primary">Je lis :</h2>
          <div className="space-y-4 text-2xl">{sentencesData}</div>
        </>
      )}
    </motion.div>
  )
}

export { MainContent }
