import { type FC, useState } from 'react'

import { DictionaryButton } from './DictionaryButton'

interface HeaderButtonsProps {
  imageIcon: string
  image: string[] | undefined
  name: string | undefined
  category: string
}

const HeaderButtons: FC<HeaderButtonsProps> = ({ imageIcon, image }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  // const [isHovered, setIsHovered] = useState(false)

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
    </div>
  )
}

export { HeaderButtons }
