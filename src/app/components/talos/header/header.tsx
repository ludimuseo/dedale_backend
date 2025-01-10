import React, { useState } from 'react'

import { GameType, JourneyType, PieceType, PlaceType, StepType } from '@/types'

import ActionButtons from './actionButtons'

interface HeaderProps {
  handleGoBack: () => void
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
  handleGoBack,
  backIcon,
  imageIcon,
  formData,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-row items-center rounded-md bg-red-100 px-4 py-2 shadow-md">
      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100">
        <img
          src={backIcon}
          alt="retour"
          className="h-10 w-10"
          onClick={handleGoBack}
        />
      </button>

      <div className="ml-4 flex-1">
        <span
          className="font-inclusive text-xl text-[#0a184d]"
          onMouseEnter={() => {
            setIsHovered(true)
          }}
          onMouseLeave={() => {
            setIsHovered(false)
          }}>
          Vous relisez le texte: {` `}
          <span className="font-bold hover:text-blue-600">
            {formData?.name.fr}
          </span>
        </span>
        {isHovered && formData?.content.image && (
          <div className="top-30 w-128 absolute left-40 mt-2 rounded-md border-4 border-sky-950 bg-black shadow-md">
            <img
              src={formData.content.image[0]}
              alt="Aperçu"
              className="h-auto w-full rounded-md"
            />
          </div>
        )}
      </div>
      <div>
        <ActionButtons imageIcon={imageIcon} image={formData?.content.image} />
      </div>
    </div>
  )
}

export default Header
