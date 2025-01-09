import 'daisyui/dist/full.css'

import { doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'

import { db } from '@/firebase/firebase'
import {
  EntityWithId,
  GameType,
  JourneyType,
  PieceType,
  PlaceType,
  StepType,
} from '@/types'

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
  formData: EntityWithId<
    PlaceType | JourneyType | StepType | PieceType | GameType
  >
}

const TalosInterfaceMain = ({ formData }: TalosInterfaceMainProps) => {
  const [validateText, setValidateText] = useState(false)
  const [activeTextId, setActiveTextId] = useState<boolean>(false) // clipboard actif
  const [coloredSentence, setColoredSentence] = useState<
    Record<number, string>
  >([])
  const [falcText, setFalcText] = useState<string[]>([])
  const [newSentence, setNewSentence] = useState<string[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoveredIndexCorrectedText, setHoveredIndexCorrectedText] = useState<
    number | null
  >(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)
  const [showProofReading, setShowProofReading] = useState(false)

  const [visibleSentences] = useState<string[]>(
    formData.description.falc.fr.split(/(?<=[.!?])\s+/)
  )

  const sentencesData = visibleSentences.map((item: string, index: number) => {
    return (
      <div
        className={`mb-2 cursor-pointer rounded-lg p-2 text-xl text-sky-950 hover:bg-slate-200 ${coloredSentence[index] || 'bg-transparent'}`}
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
      [indexToString]: 'bg-green-100',
    }))

    //ajout au state falc
    setFalcText((prev) => {
      const updated = [...prev]
      updated[index] = sentence
      return updated
    })

    //enlever le bouton de validatio (relecture obligatoire)
    setValidateText(false)
  }

  const handleModifSentenceClick = (sentence: string, index: number) => {
    const indexToString: string = index.toString()
    setNewSentence((prev) => [...prev, sentence])
    setClickedIndex(index)
    //colorer la phrase
    setColoredSentence((prev) => ({
      ...prev,
      [indexToString]: 'bg-blue-200',
    }))

    //ajout au state falc
    setFalcText((prev) => {
      const updated = [...prev]
      updated[index] = sentence
      return updated
    })
    //enlever le bouton de validatio (relecture obligatoire)
    setValidateText(false)
  }

  const handleDeleteSentenceClick = (index: number) => {
    const indexToString: string = index.toString()

    //colorer la phrase
    setColoredSentence((prev) => ({
      ...prev,
      [indexToString]: 'bg-red-200',
    }))

    //enlever le bouton de validatio (relecture obligatoire)
    setValidateText(false)
  }

  const handleDeleteText = (index: number) => {
    setNewSentence((prevSentences) =>
      prevSentences.filter((_, i) => i !== index)
    )

    setFalcText((prevSentences) => prevSentences.filter((_, i) => i !== index))

    //enlever le bouton de validatio (relecture obligatoire)
    setValidateText(false)
  }

  const handleChangeText = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    setNewSentence((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })

    setFalcText((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  const handleGoBack = () => {
    history.back()
  }

  const handleProofReading = () => {
    setShowProofReading(!showProofReading)
    setActiveTextId(false)
    if (falcText.length > 0) {
      setValidateText(true)
    }
  }

  const handleValidate = async () => {
    const id = formData.id
    const collection: string = formData.collection
    const newStatut = {
      isValidate: false,
      isCertified: true,
      certifiedDate: new Date(), // Date actuelle
      isCorrected: false,
    }
    try {
      const placeRef = doc(db, collection, id)

      await updateDoc(placeRef, {
        'description.falc.falcCertified': true,
        'description.falc.statut': newStatut,
      })

      alert('Texte envoyé')
    } catch (error) {
      console.error('Erreur de la soumission des données', error)
    }
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
          {/* Main Content SECTION GAUCHE */}
          <div className="ml-8 flex flex-grow">
            <div
              className={
                activeTextId ? 'w-1/2 border-r border-gray-300 pr-4' : 'w-full'
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
                <MainContent
                  formData={formData}
                  sentencesData={sentencesData}
                />
              )}
            </div>

            {/* SECTION DROITE */}
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
                              onChange={(e) => {
                                handleChangeText(index, e)
                              }}
                              value={newSentence[index]}
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
            validateText={validateText}
            cocheValideIcon={cocheValideIcon}
            handleProofReading={handleProofReading}
            handleValidate={void handleValidate}
            showProofReading={showProofReading}
          />
        </div>
      </div>
    </>
  )
}

export default TalosInterfaceMain
