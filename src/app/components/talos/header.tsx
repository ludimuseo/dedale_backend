import React from 'react'

import { GameType, JourneyType, PieceType, PlaceType, StepType } from '@/types'

interface HeaderProps {
  backIcon: string // Chemin de l'icône de retour
  imageIcon: string // Chemin de l'icône d'image
  zoomIconLess: string // Chemin de l'icône de zoom
  zoomIconMore: string // Chemin de l'icône de recherche
  formData:
    | PlaceType
    | JourneyType
    | StepType
    | PieceType
    | GameType
    | undefined
}

const Header: React.FC<HeaderProps> = ({
  backIcon,
  imageIcon,
  zoomIconLess,
  zoomIconMore,
  formData,
}) => {
  return (
    <div className="flex items-center justify-between rounded-md bg-red-100 px-4 py-2 shadow-md">
      {/* Back Button */}
      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100">
        <img src={backIcon} alt="retour" className="h-10 w-10" />
      </button>

      {/* Title */}
      <div className="ml-4 flex-1">
        <span className="font-bold text-[#0a184d]">
          Parcours : Animal ou humain ? &gt;{' '}
          <span className="font-bold hover:text-blue-600">
            {formData?.name.fr}
          </span>
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100">
          <img src={imageIcon} alt="Image" className="h-10 w-10" />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100">
          <img src={zoomIconLess} alt="rechercher" className="h-10 w-10" />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100">
          <img src={zoomIconMore} alt="zoomer" className="h-10 w-10" />
        </button>
      </div>
    </div>
  )
}

export default Header
