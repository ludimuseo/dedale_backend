import { type FC, useState } from 'react'

import { DictationIcon } from '../../ui/icons/DictationIcon'
import { PrintIcon } from '../../ui/icons/PrintIcon'
import { DictionaryButton } from './DictionaryButton'

interface ActionButtonsProps {
  imageIcon: string
  image: string[] | undefined
}

const ActionButtons: FC<ActionButtonsProps> = ({ imageIcon, image }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-row items-center">
      <button
        className="group btn btn-circle btn-lg relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow"
        onClick={() => {
          setSelectedImage(image ? image[0] : imageIcon)
        }}>
        <img
          src={image ? image[0] : imageIcon}
          alt="Image"
          className="h-16 w-16 rounded-full"
        />
        <span
          className="mr-4 font-inclusive text-blue-950"
          onMouseEnter={() => {
            setIsHovered(false)
          }}
          onMouseLeave={() => {
            setIsHovered(false)
          }}>
          {/* Image */}
        </span>
        <div
          role="tooltip"
          aria-label="Ajouter un correcteur"
          className="absolute left-1/2 top-full z-50 mt-2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 text-sm text-white shadow-lg group-hover:block">
          Afficher
        </div>
      </button>

      {selectedImage && (
        <div className="modal modal-open" role="dialog">
          <div className="modal-box relative">
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
              className="h-auto w-full rounded-lg"
            />
          </div>
        </div>
      )}
      {isHovered && image && (
        <div className="w-128 group absolute left-40 top-10 mt-2 rounded-md border-4 border-sky-950 bg-black shadow-md">
          <img
            src={image[0]}
            alt="Aperçu"
            className="h-auto w-full rounded-md"
          />
        </div>
      )}
      {/* IMPRIMER */}
      <button className="group btn btn-square btn-ghost btn-lg relative ml-4">
        <PrintIcon />
        <div
          role="tooltip"
          aria-label="Ajouter un correcteur"
          className="absolute left-1/2 top-full z-50 mt-2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 text-sm text-white shadow-lg group-hover:block">
          Imprimer
        </div>
      </button>

      {/* DICTEE */}
      <button className="group btn btn-square btn-ghost btn-lg relative ml-4">
        <DictationIcon />
        <div
          role="tooltip"
          aria-label="Ajouter un correcteur"
          className="absolute left-1/2 top-full z-50 mt-2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 text-sm text-white shadow-lg group-hover:block">
          Dictée
        </div>
      </button>

      {/* RECHERCHE */}
      {/* <div className="form-control ml-20">
        <input
          type="text"
          placeholder="🔎 Dictionnaire"
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </div> */}
      <DictionaryButton />
    </div>
  )
}

export { ActionButtons }
