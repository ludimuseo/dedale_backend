import 'daisyui/dist/full.css'

import { useState } from 'react'

import { GameType, JourneyType, PieceType, PlaceType, StepType } from '@/types'

import ajoutTexteIcon from '../../../assets/imgs/talos/ajout-texte.svg'
import backIcon from '../../../assets/imgs/talos/arrow-left.svg'
//import crossIcon from '../../../assets/imgs/talos/coche-faux.svg'
import cocheValideIcon from '../../../assets/imgs/talos/coche-valide.svg'
//import checkIcon from '../../../assets/imgs/talos/coche-valide-2.svg'
//import pencilIcon from '../../../assets/imgs/talos/crayon.svg'
import dicteeIcon from '../../../assets/imgs/talos/dictee.svg'
import grasIcon from '../../../assets/imgs/talos/gras.svg'
import imageIcon from '../../../assets/imgs/talos/image.svg'
import imprimerIcon from '../../../assets/imgs/talos/imprimer.svg'
import relectureIcon from '../../../assets/imgs/talos/relecture.svg'
import {
  default as zoomIconLess,
  default as zoomIconMore,
} from '../../../assets/imgs/talos/zoom-moins.svg'
import ButtonWithIcon from './buttonWithIcon'
import Header from './header'
import MainContent from './mainContent'
//import VerticalButtonGroup from './verticalButtonGroup'

interface TalosInterfaceMainProps {
  formData:
    | PlaceType
    | JourneyType
    | StepType
    | PieceType
    | GameType
    | undefined
}

const TalosInterfaceMain = ({ formData }: TalosInterfaceMainProps) => {
  // const [buttonGroups, setButtonGroups] = useState<string[]>([]) // Liste des groupes visibles
  const [activeTextId, setActiveTextId] = useState<string | null>(null) // Texte actif
  const [inputVisible, setInputVisible] = useState(false) // Gère l'affichage du champ d'entrée
  const [textColor, setTextColor] = useState('') // Couleur du texte

  const [correctedText, setCorrectedText] = useState<string[]>([])
  const [newSentence, setNewSentence] = useState<string[]>([])

  const sentences = formData?.description.falc.fr.split(/(?<=[.!?])\s+/)
  const sentencesData = sentences?.map((item: string, index: number) => {
    return (
      <div
        className={`mb-2 cursor-pointer rounded-lg p-2 text-xl text-sky-950 hover:bg-slate-200`}
        key={index}
        onClick={() => {
          handleSentence(item)
        }}>
        {item}
      </div>
    )
  })

  const handleSentence = (item: string) => {
    setNewSentence((prevSentence) => [...prevSentence, item])
    addNewSentence(newSentence)
  }

  const addNewSentence = (newSentence: string[]) => {
    setCorrectedText((prevText) => [...prevText, ...newSentence])
  }

  const handleTextClick = () => {
    // Ajoute un groupe de boutons uniquement si ce n'est pas déjà visible
    // if (!buttonGroups.includes(textId)) {
    //     setButtonGroups((prev) => [...prev, textId])
    // }
    setActiveTextId('test') // Définit le texte actif
    setInputVisible(false) // Réinitialise le champ d'entrée
    setTextColor('') // Réinitialise la couleur du texte
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4 font-sans">
      {/* Header Navigation */}
      <Header
        formData={formData}
        backIcon={backIcon}
        imageIcon={imageIcon}
        zoomIconLess={zoomIconLess}
        zoomIconMore={zoomIconMore}
      />

      <div className="flex items-start gap-4">
        {/* Left Sidebar Buttons */}
        <div className="flex flex-col items-center space-y-4 p-4">
          <ButtonWithIcon
            text="Imprimer"
            iconSrc={imprimerIcon}
            altText="Imprimer"
          />
          <ButtonWithIcon
            text="Ajouter du texte"
            iconSrc={ajoutTexteIcon}
            altText="Ajouter du texte"
          />
          <ButtonWithIcon
            text="Dicter du texte"
            iconSrc={dicteeIcon}
            altText="Dicter du texte"
          />
          <ButtonWithIcon text="Gras" iconSrc={grasIcon} altText="Gras" />
        </div>

        {/* Main Content */}
        <div className="ml-8 flex flex-grow">
          <div
            className={
              activeTextId ? 'w-1/2 border-r border-gray-300 pr-4' : 'w-full'
            }>
            <MainContent
              formData={formData}
              sentencesData={sentencesData}
              inputVisible={inputVisible}
              textColor={textColor}
              activeTextId={activeTextId} // Passe l'ID du texte actif
              onTextClick={handleTextClick} // Gère les clics sur les textes
            />
          </div>

          {/* Section droite (affichée uniquement en mode scindé) */}
          {activeTextId && (
            <div className="w-1/2 pl-4">
              <div className="mt-4 h-auto max-h-[600px] min-h-[419px] rounded-md border-2 border-black bg-white p-6 shadow-2xl">
                <h2 className="mb-4 text-lg font-bold text-[#0a184d]">
                  Je corrige et je vérifie :
                </h2>
                <>
                  {correctedText.length > 0 ? (
                    correctedText.map((item: string, index: number) => (
                      <div
                        className="mb-2 cursor-pointer rounded-lg p-2 hover:bg-slate-200"
                        key={index}
                        onClick={() => {
                          handleSentence(item)
                        }}>
                        {item}
                      </div>
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

        {/* Vertical Button Groups */}
        {/* <div className="ml-4 flex flex-col space-y-4">
                    {buttonGroups.map((textId, index) => (
                        <VerticalButtonGroup
                            key={index}
                            buttons={[
                                {
                                    iconSrc: checkIcon,
                                    altText: `Texte vert pour ${textId}`,
                                    bgColor: 'bg-green-400',
                                    onClick: () => {
                                        setTextColor('text-green-600')
                                        setInputVisible(false)
                                    },
                                },
                                {
                                    iconSrc: pencilIcon,
                                    altText: `Champ de texte pour ${textId}`,
                                    bgColor: 'bg-blue-400',
                                    onClick: () => {
                                        setInputVisible(true)
                                        setTextColor('')
                                    },
                                },
                                {
                                    iconSrc: crossIcon,
                                    altText: `Texte rouge pour ${textId}`,
                                    bgColor: 'bg-red-400',
                                    onClick: () => {
                                        setTextColor('text-red-600')
                                        setInputVisible(false)
                                    },
                                },
                            ]}
                        />
                    ))}
                </div> */}

        {/* Right Sidebar Buttons */}
        <div className="flex w-1/6 flex-col items-center space-y-4 p-4">
          <ButtonWithIcon
            text="Relire le texte"
            iconSrc={relectureIcon}
            altText="Relire le texte"
          />
          <ButtonWithIcon
            text="Valider le texte"
            iconSrc={cocheValideIcon}
            altText="Valider le texte"
          />
        </div>
      </div>
    </div>
  )
}

export default TalosInterfaceMain
