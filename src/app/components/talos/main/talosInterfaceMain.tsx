import 'daisyui/dist/full.css'

import { doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'

import backIcon from '@/assets/imgs/Talos/arrow-left.svg'
import cocheValideIcon from '@/assets/imgs/Talos/coche-valide.svg'
import imageIcon from '@/assets/imgs/Talos/image.svg'
import relectureIcon from '@/assets/imgs/Talos/relecture.svg'
import {
  default as zoomIconLess,
  default as zoomIconMore,
} from '@/assets/imgs/Talos/zoom-moins.svg'
import { db } from '@/firebase/firebase'
import {
  EntityWithId,
  GameType,
  JourneyType,
  PieceType,
  PlaceType,
  StepType,
} from '@/types'

import Header from '../header/header'
import ConfirmModal from '../modals/confirmModal'
import SuccessModal from '../modals/successModal'
import RightSideBar from '../rightSideBar'
import LeftClipboard from './leftClipboard'
import RightClipboard from './rightClipboard'

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
  const [isConfirmSubmitFalcText, setIsConfirmSubmitFalcText] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
                src="/src/assets/imgs/Talos/coche-valide.svg"
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
                src="/src/assets/imgs/Talos/crayon.svg"
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
                src="/src/assets/imgs/Talos/coche-faux.svg"
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

  const handleConfirmSubmitText = () => {
    setIsConfirmSubmitFalcText(true)
  }

  const handleValidate = async () => {
    setIsConfirmSubmitFalcText(false)
    setIsSuccess(true)
    const id = formData.id
    const collection: string = formData.collection
    const falcCertified: string[] = falcText
    const newStatut = {
      isValidate: false,
      isCertified: true,
      certifiedDate: new Date(),
      isCorrected: false,
    }
    try {
      const placeRef = doc(db, collection, id)

      await updateDoc(placeRef, {
        'description.falc.falcCertified': falcCertified,
        'description.falc.statut': newStatut,
      })
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
            <LeftClipboard
              isLeftClipboardShowed={activeTextId}
              showProofReading={showProofReading}
              falcText={falcText}
              formData={formData}
              sentencesData={sentencesData}
            />
            {/* SECTION DROITE */}
            <RightClipboard
              activeTextId={activeTextId}
              newSentence={newSentence}
              handleMouseOverCorrectedText={handleMouseOverCorrectedText}
              handleMouseLeave={handleMouseLeave}
              handleChangeText={handleChangeText}
              hoveredIndexCorrectedText={hoveredIndexCorrectedText}
              handleDeleteText={handleDeleteText}
            />
          </div>
          <RightSideBar
            relectureIcon={relectureIcon}
            validateText={validateText}
            cocheValideIcon={cocheValideIcon}
            handleProofReading={handleProofReading}
            handleConfirmSubmitText={() => {
              handleConfirmSubmitText()
            }}
            showProofReading={showProofReading}
          />
        </div>
        {isConfirmSubmitFalcText && (
          <ConfirmModal
            setIsConfirmSubmitFalcText={setIsConfirmSubmitFalcText}
            handleValidate={() => void handleValidate()}
          />
        )}
        {isSuccess && <SuccessModal setIsSuccess={setIsSuccess} />}
      </div>
    </>
  )
}

export default TalosInterfaceMain
