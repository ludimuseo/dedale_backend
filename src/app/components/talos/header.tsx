import React from 'react'

import { GameType, JourneyType, PieceType, PlaceType, StepType } from '@/types'

import ActionButtons from './header/actionButtons'

interface HeaderProps {
  backIcon: string
  imageIcon: string
  zoomIconLess: string
  zoomIconMore: string
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
  console.log('formData?.content.image: ', formData?.content.image)
  return (
    <div className="flex items-center justify-between rounded-md bg-red-100 px-4 py-2 shadow-md">
      {/* Back Button */}
      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100">
        <img src={backIcon} alt="retour" className="h-10 w-10" />
      </button>

      {/* Title */}
      <div className="ml-4 flex-1">
        <span className="text-xl font-bold text-[#0a184d]">
          Parcours : Animal ou humain ? &gt;{' '}
          <span className="font-bold hover:text-blue-600">
            {formData?.name.fr}
          </span>
        </span>
      </div>
      <ActionButtons
        imageIcon={imageIcon}
        zoomIconLess={zoomIconLess}
        zoomIconMore={zoomIconMore}
        image={formData?.content.image}
      />
    </div>
  )
}

export default Header
