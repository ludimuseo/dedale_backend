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
  const [activeTextId, setActiveTextId] = useState<boolean>(false) // clipboard actif
  //const [textColor, setTextColor] = useState('') // Couleur du texte

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
        className={`mb-2 cursor-pointer rounded-lg p-2 text-xl text-sky-950 hover:bg-slate-200`}
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
    setNewSentence((prev) => [...prev, sentence])
    setClickedIndex(index)
  }

  const handleDeleteText = (index: number) => {
    setNewSentence((prevSentences) =>
      prevSentences.filter((_, i) => i !== index)
    )
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
              //textColor={textColor}
              activeTextId={activeTextId} // Passe l'ID du texte actif
            />
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
                                  alt="crayon"
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
