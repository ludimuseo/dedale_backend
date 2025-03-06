import React from 'react'

import { GameType, JourneyType, PieceType, PlaceType, StepType } from '@/types'
import {
  isGameType,
  isJourneyType,
  isPieceType,
  isPlaceType,
  isStepType,
} from '@/types/typeGuards'

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
  function getFormDataType(
    formData1:
      | PlaceType
      | JourneyType
      | StepType
      | PieceType
      | GameType
      | undefined
  ): string {
    if (!formData1) {
      return 'Inconnu'
    }

    if (isPlaceType(formData1)) {
      return 'Lieu'
    }
    if (isJourneyType(formData1)) {
      return 'Parcours'
    }
    if (isStepType(formData1)) {
      return 'Étape'
    }
    if (isPieceType(formData1)) {
      return 'Œuvre'
    }
    if (isGameType(formData1)) {
      return 'Jeu'
    }

    return 'Inconnu'
  }

  return (
    <div className="navbar flex flex-row items-center rounded-md bg-red-100 px-4 py-2 shadow-md">
      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100">
        <img
          src={backIcon}
          alt="retour"
          className="h-10 w-10"
          onClick={handleGoBack}
        />
      </button>

      <div className="ml-4 flex-1">
        <span className="font-inclusive text-xl text-[#0a184d]">
          Vous relisez le texte: {` `}
          <span className="font-bold hover:text-blue-600">
            {formData?.name.fr}
          </span>
        </span>
      </div>
      <div className="w-1/2">
        <ActionButtons
          imageIcon={imageIcon}
          image={formData?.content.image}
          name={formData?.name.fr}
          category={getFormDataType(formData)}
        />
      </div>
    </div>
  )
}

export default Header
