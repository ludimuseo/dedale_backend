// import 'daisyui/dist/full.css'

// import backIcon from '@img/Talos/arrow-left.svg'
// import cocheValideIcon from '@img/Talos/coche-valide.svg'
// import imageIcon from '@img/Talos/image.svg'
// import relectureIcon from '@img/Talos/relecture.svg'
// import {
//   default as zoomIconLess,
//   default as zoomIconMore,
// } from '@img/Talos/zoom-moins.svg'
// import { doc, updateDoc } from 'firebase/firestore'
// import { AnimatePresence, motion } from 'framer-motion'
// import { type FC, useState } from 'react'
// import { useNavigate } from 'react-router'

// import { useLocalStorage } from '@/app/hooks/useLocalStorage'
// import { db } from '@/firebase/firebase'
// import {
//   EntityWithId,
//   GameType,
//   JourneyType,
//   PieceType,
//   PlaceType,
//   StepType,
// } from '@/types'

// import { PenIcon } from '../../ui/icons/PenIcon'
// import { WrongCheck } from '../../ui/icons/WrongCheck'
// import { Header } from '../header'
// import { ConfirmModal } from '../modals/ConfirmModal'
// import { ProofReadingModal } from '../modals/ProofReadingModal'
// import { SuccessModal } from '../modals/SuccessModal'
// import { RightSideBar } from '../RightSideBar'
// import { LeftClipboard } from './LeftClipboard'
// import { RightClipboard } from './RightClipboard'

// interface TalosInterfaceMainProps {
//   formData: EntityWithId<
//     PlaceType | JourneyType | StepType | PieceType | GameType
//   >
// }

// export interface Sentence {
//   sentence: string
//   id: string
// }

// const TalosInterfaceMain: FC<TalosInterfaceMainProps> = ({ formData }) => {
//   const navigate = useNavigate()
//   const [validateText, setValidateText] = useState(false)
//   const [activeTextId, setActiveTextId] = useState<boolean>(false) // clipboard actif
//   const [savedSentence, setSavedSentence, clearValue] = useLocalStorage(
//     `savedSentence-${formData.id}`,
//     ''
//   )
//   const [coloredSentence, setColoredSentence] = useState<
//     Record<string, string>
//   >(() => {
//     const coloredSentences: Record<string, string> = {}
//     if (Array.isArray(savedSentence)) {
//       ;(savedSentence as Sentence[]).forEach((sentence) => {
//         coloredSentences[sentence.id] = 'bg-blue-200'
//       })
//     }
//     return coloredSentences
//   })
//   const [goBack, setGoBack] = useState<boolean>(false)
//   const [falcText, setFalcText] = useState<Sentence[]>(
//     Array.isArray(savedSentence) ? savedSentence : []
//   )

//   const [newSentence, setNewSentence] = useState<Sentence[]>(
//     Array.isArray(savedSentence) ? savedSentence : []
//   )

//   const [hoveredIndex, setHoveredIndex] = useState<string | null>(null)
//   const [hoveredIndexCorrectedText, setHoveredIndexCorrectedText] = useState<
//     string | null
//   >(null)
//   const [clickedIndex, setClickedIndex] = useState<string | null>(null)
//   const [showProofReading, setShowProofReading] = useState(false)
//   const [isConfirmSubmitFalcText, setIsConfirmSubmitFalcText] = useState(false)
//   const [isSuccess, setIsSuccess] = useState(false)

//   const [visibleSentences] = useState<Sentence[]>(
//     formData.description.falc.fr
//       .split(/(?<=[.!?:])\s+/)
//       .map((sentence: string, index: number) => {
//         const id = `sentence_${String(index)}`
//         return {
//           id: id,
//           sentence: sentence,
//         }
//       })
//   )

//   const sentencesData = visibleSentences.map(
//     (item: Sentence, index: number) => {
//       let disabled = false
//       for (const element of newSentence) {
//         if (element.id === item.id) {
//           disabled = true
//         }
//       }
//       return (
//         <motion.div
//           key={item.id}
//           animate={{ opacity: 1 }}
//           initial={{ opacity: 0 }}
//           transition={{ duration: 0.6, delay: index * 0.3, ease: 'linear' }}
//           className={`mb-2 cursor-pointer rounded-lg p-2 font-inclusive text-2xl text-sky-950 ${coloredSentence[item.id] || 'bg-transparent'} hover:bg-slate-100 hover:transition-all hover:duration-300 hover:ease-in-out`}
//           onMouseOver={() => {
//             handleMouseOver(item.id)
//           }}
//           onMouseLeave={() => {
//             handleMouseLeave()
//           }}>
//           <p>{item.sentence}</p>
//           <AnimatePresence mode="popLayout">
//             {hoveredIndex === item.id && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3, ease: 'linear' }}
//                 className="ml-auto flex w-32 flex-row rounded-xl border-2 bg-slate-200 p-1 pl-2 pr-3"
//                 key="buttons">
//                 {/* <div
//                 onClick={() => {
//                   handleSentenceClick(item, index)
//                 }}
//                 className={`transition-transform duration-200 ease-in-out ${clickedIndex === index ? 'scale-90' : 'hover:scale-110'
//                   }`}>
//                 <AiValidationIcon />
//               </div> */}

//                 <div
//                   onClick={() => {
//                     handleModifSentenceClick(item)
//                   }}
//                   className={`transition-transform duration-200 ease-in-out ${disabled ? 'pointer-events-none' : ''} ${
//                     clickedIndex === item.id ? 'scale-90' : 'hover:scale-110'
//                   }`}>
//                   <PenIcon size={32} color={disabled ? 'grey' : 'blue'} />
//                 </div>
//                 <div
//                   onClick={() => {
//                     handleDeleteSentenceClick(item.id)
//                   }}
//                   className={`ml-1 transition-transform duration-200 ease-in-out ${
//                     clickedIndex === item.id ? 'scale-90' : 'hover:scale-110'
//                   }`}>
//                   <WrongCheck className="h-8 w-8" />
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       )
//     }
//   )

//   const handleMouseOver = (index: string) => {
//     setHoveredIndex(index)
//     setActiveTextId(true)
//   }

//   const handleMouseOverCorrectedText = (index: string) => {
//     setHoveredIndexCorrectedText(index)
//   }

//   const handleMouseLeave = () => {
//     setHoveredIndex(null)
//     setHoveredIndexCorrectedText(null)
//   }

//   // const handleSentenceClick = (sentence: string, index: number) => {
//   //   const indexToString: string = index.toString()
//   //   setNewSentence((prev) => [...prev, sentence])
//   //   setClickedIndex(index)
//   //   //colorer la phrase
//   //   setColoredSentence((prev) => ({
//   //     ...prev,
//   //     [indexToString]: 'bg-green-100',
//   //   }))

//   //   //ajout au state falc
//   //   setFalcText((prev) => {
//   //     const updated = [...prev]
//   //     updated[index] = sentence
//   //     return updated
//   //   })

//   //   //enlever le bouton de validatio (relecture obligatoire)
//   //   setValidateText(false)
//   // }

//   const handleModifSentenceClick = (sentenceObject: Sentence) => {
//     const indexToString: string = sentenceObject.id
//     setNewSentence((prev) => [...prev, sentenceObject])
//     setClickedIndex(sentenceObject.id)
//     //colorer la phrase
//     setColoredSentence((prev) => ({
//       ...prev,
//       [indexToString]: 'bg-blue-200',
//     }))

//     //ajout au state falc
//     setFalcText((prev) => [...prev, sentenceObject])

//     //enlever le bouton de validatio (relecture obligatoire)
//     setValidateText(false)
//   }

//   const handleDeleteSentenceClick = (index: string) => {
//     const indexToString: string = index.toString()

//     //colorer la phrase
//     setColoredSentence((prev) => ({
//       ...prev,
//       [indexToString]: 'bg-red-200',
//     }))

//     //enlever le bouton de validatio (relecture obligatoire)
//     setValidateText(false)
//   }

//   /**
//    * Handle the deletion of a sentence from the user input.
//    * @param {number} index - The index of the sentence to delete.
//    */
//   const handleDeleteText = (index: string) => {
//     setNewSentence((prevSentences) =>
//       prevSentences.filter((prev) => prev.id !== index)
//     )

//     setFalcText((prevSentences) =>
//       prevSentences.filter((prev) => prev.id !== index)
//     )

//     setColoredSentence((prev) =>
//       Object.fromEntries(Object.entries(prev).filter(([key]) => key !== index))
//     )

//     //enlever le bouton de validatio (relecture obligatoire)
//     setValidateText(false)
//   }

//   const handleChangeText = (
//     index: string,
//     e: React.ChangeEvent<HTMLTextAreaElement>
//   ) => {
//     const value = e.target.value
//     setNewSentence((prev) =>
//       prev.map((item) =>
//         item.id === index ? { ...item, sentence: value } : item
//       )
//     )

//     setFalcText((prev) =>
//       prev.map((item) =>
//         item.id === index ? { ...item, sentence: value } : item
//       )
//     )
//   }

//   const handleGoBack = () => {
//     if (newSentence.length > 0 && !isSuccess) {
//       setGoBack(true)
//     } else if (showProofReading) {
//       setShowProofReading(false)
//       setActiveTextId(false)
//     } else {
//       clearValue()
//       void navigate('/textList')
//     }
//   }

//   const handleLeaveProofReading = () => {
//     setSavedSentence(() => [...newSentence])
//     void navigate('/textList')
//   }

//   const handleProofReading = () => {
//     setShowProofReading(!showProofReading)
//     setActiveTextId(false)
//     if (falcText.length > 0) {
//       setValidateText(true)
//     }
//   }

//   const handleKeepProofReading = () => {
//     setGoBack(false)
//     setShowProofReading(true)
//     setActiveTextId(false)
//     if (falcText.length > 0) {
//       setValidateText(true)
//     }
//   }

//   const handleConfirmSubmitText = () => {
//     setIsConfirmSubmitFalcText(true)
//   }

//   const handleValidate = async () => {
//     clearValue()
//     setIsConfirmSubmitFalcText(false)
//     setIsSuccess(true)
//     const id = formData.id
//     const collection: string = formData.collection
//     const falcCertified: Sentence[] = falcText
//     const newStatut = {
//       isValidate: false,
//       isCertified: true,
//       certifiedDate: new Date(),
//       isCorrected: false,
//     }

//     if (!formData.id || !formData.collection) {
//       console.error('ID ou collection manquant', formData)
//       return
//     }

//     try {
//       const placeRef = doc(db, collection, id)

//       await updateDoc(placeRef, {
//         'description.falc.falcCertified': falcCertified
//           .map((sentence) => sentence.sentence)
//           .join('\n'),
//         'description.falc.status': newStatut,
//       })
//     } catch (error) {
//       console.error('Erreur de la soumission des données', error)
//     }
//   }

//   return (
//     <>
//       <Header
//         formData={formData}
//         handleGoBack={handleGoBack}
//         backIcon={backIcon}
//         imageIcon={imageIcon}
//         zoomIconLess={zoomIconLess}
//         zoomIconMore={zoomIconMore}
//       />
//       <div className="min-h-screen bg-blue-50 font-sans">
//         <div className="flex items-start space-x-4">
//           {/* Main Content SECTION GAUCHE */}
//           <div className="ml-8 flex flex-grow">
//             <LeftClipboard
//               isLeftClipboardShowed={activeTextId}
//               showProofReading={showProofReading}
//               falcText={falcText}
//               formData={formData}
//               sentencesData={sentencesData}
//             />
//             {/* SECTION DROITE */}
//             <RightClipboard
//               activeTextId={activeTextId}
//               newSentence={newSentence}
//               handleMouseOverCorrectedText={handleMouseOverCorrectedText}
//               handleMouseLeave={handleMouseLeave}
//               handleChangeText={handleChangeText}
//               hoveredIndexCorrectedText={hoveredIndexCorrectedText}
//               handleDeleteText={handleDeleteText}
//             />
//           </div>
//           <RightSideBar
//             relectureIcon={relectureIcon}
//             validateText={validateText}
//             cocheValideIcon={cocheValideIcon}
//             handleProofReading={handleProofReading}
//             handleConfirmSubmitText={() => {
//               handleConfirmSubmitText()
//             }}
//             showProofReading={showProofReading}
//           />
//         </div>
//         {isConfirmSubmitFalcText && (
//           <ConfirmModal
//             setIsConfirmSubmitFalcText={setIsConfirmSubmitFalcText}
//             handleValidate={() => void handleValidate()}
//           />
//         )}
//         {isSuccess && <SuccessModal setIsSuccess={setIsSuccess} />}
//         {goBack && (
//           <ProofReadingModal
//             handleKeepProofReading={handleKeepProofReading}
//             handleLeaveProofReading={handleLeaveProofReading}
//           />
//         )}
//       </div>
//     </>
//   )
// }

// export { TalosInterfaceMain }
