import { type FC, useState } from 'react'

import SuggestionModal from '../modals/suggestionModal'
import { DictionaryButton } from './DictionaryButton'

interface HeaderButtonsProps {
  imageIcon: string
  image: string[] | undefined
  name: string | undefined
  category: string
}

const HeaderButtons: FC<HeaderButtonsProps> = ({
  imageIcon,
  image,
  name,
  category,
}: HeaderButtonsProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showSuggestionModal, setShowSuggestionModal] = useState(false)

  const closeSuggestionModal = () => {
    setShowSuggestionModal(false)
  }

  return (
    <div className="flex flex-row items-center justify-center space-x-4">
      <button
        className="group btn btn-square"
        onClick={() => {
          setSelectedImage(image ? image[0] : imageIcon)
        }}>
        <img
          src={image ? image[0] : imageIcon}
          alt="Image"
          className="h-12 w-12 rounded-xl"
        />
        <div
          role="tooltip"
          aria-label="Afficher"
          className="absolute left-1/2 top-full z-50 mt-2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 font-inclusive text-sm text-white shadow-lg group-hover:block">
          <span className="font-sans">Afficher</span>
        </div>
      </button>

      {selectedImage && (
        <div
          className="modal modal-open flex items-center justify-center"
          role="dialog"
          style={{
            width: '100vw',
            height: '100vh',
          }}>
          <div
            className="relative rounded-lg bg-white p-4"
            style={{
              transform: 'translateX(20vw)', // Décale la fenêtre
              width: '50vw',
              height: '90vh',
            }}>
            <button
              className="btn btn-circle btn-primary btn-sm absolute right-2 top-2"
              onClick={() => {
                setSelectedImage(null)
              }}>
              <span className="font-extrabold text-stone-50">✕</span>
            </button>
            <img
              src={selectedImage}
              alt="Zoomed"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain', // Garde l'image entière et sans déformation
              }}
              className="rounded-lg"
            />
          </div>
        </div>
      )}

      {/* IMPRIMER */}
      {/* <button className="group btn btn-square btn-ghost btn-sm relative border-2 border-blue-500">
        <PrintIcon className="h-4 w-4" />
        <div
          role="tooltip"
          aria-label="Imprimer"
          className="absolute left-1/2 top-full z-50 mt-2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 text-sm text-white shadow-lg group-hover:block">
          <span className="font-sans">Imprimer</span>
        </div>
      </button> */}

      {/* DICTEE */}
      {/* <button className="group btn btn-square btn-ghost btn-sm relative border-2 border-blue-500">
        <DictationIcon className="h-4 w-4" />
        <div
          role="tooltip"
          aria-label="Dictée"
          className="absolute left-1/2 top-full z-50 mt-2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 text-sm text-white shadow-lg group-hover:block">
          <span className="font-sans">Dictée</span>
        </div>
      </button> */}

      <DictionaryButton />
      <button
        className="btn btn-primary"
        onClick={() => {
          setShowSuggestionModal(true)
        }}>
        <svg
          aria-label="WeChat logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32">
          <g fill="white">
            <path d="M11.606,3.068C5.031,3.068,0,7.529,0,12.393s4.344,7.681,4.344,7.681l-.706,2.676c-.093,.353,.284,.644,.602,.464l3.173-1.798c1.403,.447,4.381,.59,4.671,.603-.208-.721-.311-1.432-.311-2.095,0-3.754,3.268-9.04,10.532-9.04,.165,0,.331,.004,.496,.011-.965-4.627-5.769-7.827-11.195-7.827Zm-4.327,7.748c-.797,0-1.442-.646-1.442-1.442s.646-1.442,1.442-1.442,1.442,.646,1.442,1.442-.646,1.442-1.442,1.442Zm8.386,0c-.797,0-1.442-.646-1.442-1.442s.646-1.442,1.442-1.442,1.442,.646,1.442,1.442-.646,1.442-1.442,1.442Z"></path>
            <path d="M32,19.336c0-4.26-4.998-7.379-9.694-7.379-6.642,0-9.459,4.797-9.459,7.966s2.818,7.966,9.459,7.966c1.469,0,2.762-.211,3.886-.584l2.498,1.585c.197,.125,.447-.052,.394-.279l-.567-2.46c2.36-1.643,3.483-4.234,3.483-6.815Zm-12.73-.81c-.704,0-1.275-.571-1.275-1.275s.571-1.275,1.275-1.275,1.275,.571,1.275,1.275c0,.705-.571,1.275-1.275,1.275Zm6.373,0c-.704,0-1.275-.571-1.275-1.275s.571-1.275,1.275-1.275,1.275,.571,1.275,1.275-.571,1.275-1.275,1.275Z"></path>
          </g>
        </svg>
        <p className="font-inclusive text-xl">Envoyer une suggestion</p>
      </button>
      <SuggestionModal
        isOpen={showSuggestionModal}
        onClose={() => {
          closeSuggestionModal()
        }}
        name={name}
        category={category}
      />
    </div>
  )
}

export { HeaderButtons }
