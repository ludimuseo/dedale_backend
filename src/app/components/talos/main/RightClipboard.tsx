/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { motion } from 'framer-motion'
import { type FC } from 'react'

import { WrongCheck } from '../../ui/icons/WrongCheck'
//import { Sentence } from './TalosInterfaceMain'

interface RightClipboardProps {
  activeTextId: boolean
  newSentence: Sentence[]
  handleMouseOverCorrectedText: (index: string) => void
  handleMouseLeave: () => void
  handleChangeText: (
    index: string,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void
  hoveredIndexCorrectedText: string | null
  handleDeleteText: (index: string) => void
}

const RightClipboard: FC<RightClipboardProps> = ({
  activeTextId,
  newSentence,
  handleMouseOverCorrectedText,
  handleMouseLeave,
  handleChangeText,
  hoveredIndexCorrectedText,
  handleDeleteText,
}) => {
  return (
    <>
      {activeTextId && (
        <motion.div
          animate={{ translateY: 0 }}
          initial={{ translateY: 100 }}
          transition={{ duration: 0.3, ease: 'linear' }}
          className="w-1/2 pl-4">
          <div className="mt-4 h-auto rounded-md border-2 border-black bg-white p-6 shadow-2xl">
            <h2 className="mb-4 text-xl font-bold text-[#0a184d]">
              Je corrige et je vérifie :
            </h2>
            <>
              {newSentence.length > 0 ? (
                newSentence.map((item: Sentence) => (
                  <>
                    <div
                      key={item.id}
                      className="mb-2 flex cursor-pointer flex-row rounded-lg p-2 hover:bg-slate-200 hover:transition-all hover:duration-300 hover:ease-in-out"
                      onMouseOver={() => {
                        handleMouseOverCorrectedText(item.id)
                      }}
                      onMouseLeave={() => {
                        handleMouseLeave()
                      }}>
                      <textarea
                        onChange={(e) => {
                          handleChangeText(item.id, e)
                        }}
                        value={item.sentence}
                        className="textarea textarea-ghost textarea-xs w-full max-w-xl"
                        style={{ fontSize: '22px' }}>
                        {item.sentence}
                      </textarea>
                      {hoveredIndexCorrectedText === item.id && (
                        <div className="border-1 ml-auto w-12 rounded-xl p-2">
                          <div
                            onClick={() => {
                              handleDeleteText(item.id)
                            }}>
                            <WrongCheck className="h-8 w-8" />
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ))
              ) : (
                <p className="italic text-gray-500">
                  Cliquez sur texte de à gauche pour le modifier ...
                </p>
              )}
            </>
          </div>
        </motion.div>
      )}
    </>
  )
}

export { RightClipboard }
