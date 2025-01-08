import 'daisyui/dist/full.css'

import { useState } from 'react'

import { GameType, JourneyType, PieceType, PlaceType, StepType } from '@/types'

import backIcon from '../../../assets/imgs/talos/arrow-left.svg'
import cocheValideIcon from '../../../assets/imgs/talos/coche-valide.svg'
import imageIcon from '../../../assets/imgs/talos/image.svg'
import relectureIcon from '../../../assets/imgs/talos/relecture.svg'
import {
  default as zoomIconLess,
  default as zoomIconMore,
} from '../../../assets/imgs/talos/zoom-moins.svg'
import Header from './header/header'
import MainContent from './mainContent'
import RightSideBar from './rightSideBar'

interface TalosInterfaceMainProps {
  formData:
    | PlaceType
    | JourneyType
    | StepType
    | PieceType
    | GameType
    | undefined
}

type ColoredType = Record<string, { color: string }>

const TalosInterfaceMain = ({ formData }: TalosInterfaceMainProps) => {
  const [activeTextId, setActiveTextId] = useState<boolean>(false) // clipboard actif
  const [coloredSentence, setColoredSentence] = useState<ColoredType[]>([])
  const [newSentence, setNewSentence] = useState<string[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoveredIndexCorrectedText, setHoveredIndexCorrectedText] = useState<
    number | null
  >(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)

  const [visibleSentences] = useState<string[]>(
    formData?.description.falc.fr.split(/(?<=[.!?])\s+/) ?? []
  )

  const sentencesData = visibleSentences.map((item: string, index: number) => {
    return (
      <div
        className={`mb-2 cursor-pointer rounded-lg p-2 text-xl text-sky-950 hover:bg-slate-200 ${JSON.stringify(coloredSentence[index]?.color) || 'bg-transparent'}`}
        key={index}
        onMouseOver={() => {
          handleMouseOver(index)
        }}
        onMouseLeave={() => {
          handleMouseLeave()
        }}>
        {item}
        {hoveredIndex === index && (
          <div className="ml-auto flex w-32 flex-row rounded-xl border-2 bg-slate-200 pl-2 pr-3">
            <div
              onClick={() => {
                handleSentenceClick(item, index)
              }}
              className={`transition-transform duration-200 ease-in-out ${
                clickedIndex === index ? 'scale-90' : 'hover:scale-110'
              }`}>
              <img
                src="/src/assets/imgs/talos/coche-valide.svg"
                alt="crayon"
                className="h-[40px] w-[200px]"
              />
            </div>
            <div
              onClick={() => {
                handleModifSentenceClick(item, index)
              }}
              className={`transition-transform duration-200 ease-in-out ${
                clickedIndex === index ? 'scale-90' : 'hover:scale-110'
              }`}>
              <img
                src="/src/assets/imgs/talos/crayon.svg"
                alt="crayon"
                className="ml-1 h-[40px] w-[200px]"
              />
            </div>
            <div
              onClick={() => {
                handleDeleteSentenceClick(index)
              }}
              className={`transition-transform duration-200 ease-in-out ${
                clickedIndex === index ? 'scale-90' : 'hover:scale-110'
              }`}>
              <img
                src="/src/assets/imgs/talos/coche-faux.svg"
                alt="crayon"
                className="ml-2 h-[40px] w-[200px]"
              />
            </div>
          </div>
        )}
      </div>
    )
  })

  const handleMouseOver = (index: number) => {
    setHoveredIndex(index)
    setActiveTextId(true)
  }

  const handleMouseOverCorrectedText = (index: number) => {
    setHoveredIndexCorrectedText(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setHoveredIndexCorrectedText(null)
  }

  const handleSentenceClick = (sentence: string, index: number) => {
    const indexToString: string = index.toString()
    setNewSentence((prev) => [...prev, sentence])
    setClickedIndex(index)
    //colorer la phrase
    setColoredSentence((prev) => ({
      ...prev,
      [indexToString]: { color: 'bg-green-100' },
    }))
  }

  const handleModifSentenceClick = (sentence: string, index: number) => {
    const indexToString: string = index.toString()
    setNewSentence((prev) => [...prev, sentence])
    setClickedIndex(index)
    //colorer la phrase
    setColoredSentence((prev) => ({
      ...prev,
      [indexToString]: { color: 'bg-blue-200' },
    }))
  }

  const handleDeleteSentenceClick = (index: number) => {
    const indexToString: string = index.toString()
    //colorer la phrase
    setColoredSentence((prev) => ({
      ...prev,
      [indexToString]: { color: 'bg-red-200' },
    }))
  }

  const handleDeleteText = (index: number) => {
    setNewSentence((prevSentences) =>
      prevSentences.filter((_, i) => i !== index)
    )
  }

  const handleGoBack = () => {
    history.back()
  }

  return (
    <>
      <Header
        formData={formData}
        handleGoBack={handleGoBack}
        backIcon={backIcon}
        imageIcon={imageIcon}
        zoomIconLess={zoomIconLess}
        zoomIconMore={zoomIconMore}
      />
      <div className="min-h-screen bg-blue-50 font-sans">
        <div className="flex items-start space-x-4">
          {/* Main Content */}
          <div className="ml-8 flex flex-grow">
            <div
              className={
                activeTextId ? 'w-1/2 border-r border-gray-300 pr-4' : 'w-full'
              }>
              <MainContent formData={formData} sentencesData={sentencesData} />
            </div>

            {/* Section droite (affichée uniquement en mode scindé) */}
            {activeTextId && (
              <div className="w-1/2 pl-4">
                <div className="mt-4 h-auto max-h-[600px] min-h-[419px] rounded-md border-2 border-black bg-white p-6 shadow-2xl">
                  <h2 className="mb-4 text-xl font-bold text-[#0a184d]">
                    Je corrige et je vérifie :
                  </h2>
                  <>
                    {newSentence.length > 0 ? (
                      newSentence.map((item: string, index: number) => (
                        <>
                          <div
                            className="mb-2 flex cursor-pointer flex-row rounded-lg p-2 hover:bg-slate-200"
                            key={index}
                            onMouseOver={() => {
                              handleMouseOverCorrectedText(index)
                            }}
                            onMouseLeave={() => {
                              handleMouseLeave()
                            }}>
                            <textarea
                              className="textarea textarea-ghost textarea-xs w-full max-w-xl"
                              style={{ fontSize: '22px' }}>
                              {item}
                            </textarea>
                            {hoveredIndexCorrectedText === index && (
                              <div className="border-1 ml-auto w-12 rounded-xl p-2">
                                <div
                                  onClick={() => {
                                    handleDeleteText(index)
                                  }}>
                                  <img
                                    src="/src/assets/imgs/talos/coche-faux.svg"
                                    alt="supprimer"
                                    className="h-[25px] w-[200px]"
                                  />
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
              </div>
            )}
          </div>

          <RightSideBar
            relectureIcon={relectureIcon}
            cocheValideIcon={cocheValideIcon}
          />
        </div>
      </div>
    </>
  )
}

export default TalosInterfaceMain
