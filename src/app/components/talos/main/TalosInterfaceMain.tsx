import 'daisyui/dist/full.css'

import backIcon from '@img/Talos/arrow-left.svg'
import cocheValideIcon from '@img/Talos/coche-valide.svg'
import imageIcon from '@img/Talos/image.svg'
import relectureIcon from '@img/Talos/relecture.svg'
import {
  default as zoomIconLess,
  default as zoomIconMore,
} from '@img/Talos/zoom-moins.svg'
import { doc, updateDoc } from 'firebase/firestore'
import { AnimatePresence, motion } from 'framer-motion'
import { type FC, useState } from 'react'
import { useNavigate } from 'react-router'

import { db } from '@/firebase/firebase'
import {
  EntityWithId,
  GameType,
  JourneyType,
  PieceType,
  PlaceType,
  StepType,
} from '@/types'

import { PenIcon } from '../../ui/icons/PenIcon'
import { WrongCheck } from '../../ui/icons/WrongCheck'
import { Header } from '../header'
import { ConfirmModal } from '../modals/ConfirmModal'
import { SuccessModal } from '../modals/SuccessModal'
import { RightSideBar } from '../RightSideBar'
import { LeftClipboard } from './LeftClipboard'
import { RightClipboard } from './RightClipboard'

interface TalosInterfaceMainProps {
  formData: EntityWithId<
    PlaceType | JourneyType | StepType | PieceType | GameType
  >
}

const TalosInterfaceMain: FC<TalosInterfaceMainProps> = ({ formData }) => {
  const navigate = useNavigate()
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
    formData.description.falc.fr.split(/(?<=[.!?:])\s+/)
  )

  const sentencesData = visibleSentences.map((item: string, index: number) => {
    return (
      <motion.div
        key={`sentence_` + String(index)}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: index * 0.3, ease: 'linear' }}
        className={`mb-2 cursor-pointer rounded-lg p-2 font-inclusive text-2xl text-sky-950 ${coloredSentence[index] || 'bg-transparent'} hover:bg-slate-100 hover:transition-all hover:duration-300 hover:ease-in-out`}
        onMouseOver={() => {
          handleMouseOver(index)
        }}
        onMouseLeave={() => {
          handleMouseLeave()
        }}>
        <p>{item}</p>
        <AnimatePresence mode="popLayout">
          {hoveredIndex === index && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: 'linear' }}
              className="ml-auto flex w-32 flex-row rounded-xl border-2 bg-slate-200 p-1 pl-2 pr-3"
              key="buttons">
              {/* <div
                onClick={() => {
                  handleSentenceClick(item, index)
                }}
                className={`transition-transform duration-200 ease-in-out ${clickedIndex === index ? 'scale-90' : 'hover:scale-110'
                  }`}>
                <AiValidationIcon />
              </div> */}

              <div
                onClick={() => {
                  handleModifSentenceClick(item, index)
                }}
                className={`transition-transform duration-200 ease-in-out ${
                  clickedIndex === index ? 'scale-90' : 'hover:scale-110'
                }`}>
                <PenIcon size={32} color="blue" />
              </div>
              <div
                onClick={() => {
                  handleDeleteSentenceClick(index)
                }}
                className={`ml-1 transition-transform duration-200 ease-in-out ${
                  clickedIndex === index ? 'scale-90' : 'hover:scale-110'
                }`}>
                <WrongCheck className="h-8 w-8" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
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

  // const handleSentenceClick = (sentence: string, index: number) => {
  //   const indexToString: string = index.toString()
  //   setNewSentence((prev) => [...prev, sentence])
  //   setClickedIndex(index)
  //   //colorer la phrase
  //   setColoredSentence((prev) => ({
  //     ...prev,
  //     [indexToString]: 'bg-green-100',
  //   }))

  //   //ajout au state falc
  //   setFalcText((prev) => {
  //     const updated = [...prev]
  //     updated[index] = sentence
  //     return updated
  //   })

  //   //enlever le bouton de validatio (relecture obligatoire)
  //   setValidateText(false)
  // }

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
    void navigate('/textList')
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

    if (!formData.id || !formData.collection) {
      console.error('ID ou collection manquant', formData)
      return
    }

    try {
      const placeRef = doc(db, collection, id)

      await updateDoc(placeRef, {
        'description.falc.falcCertified': falcCertified.join('\n'),
        'description.falc.status': newStatut,
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

export { TalosInterfaceMain }
