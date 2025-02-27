import { type FC } from 'react'

import { GameType, JourneyType, PieceType, PlaceType, StepType } from '@/types'

import { ActionButtons } from './ActionButtons'

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

const Header: FC<HeaderProps> = ({
  handleGoBack,
  backIcon,
  imageIcon,
  formData,
}) => {
  return (
    <div className="navbar flex flex-row items-center rounded-md bg-red-100 px-4 py-2 shadow-md">
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
        onClick={() => {
          handleGoBack()
        }}>
        <img src={backIcon} alt="retour" className="h-10 w-10" />
      </button>

      <div className="ml-4 flex-1">
        <span className="font-inclusive text-xl text-[#0a184d]">
          Vous relisez le texte : {` `}
          <span className="font-bold hover:text-blue-600">
            {formData?.name.fr}
          </span>
        </span>
      </div>
      <div className="w-1/2">
        <ActionButtons imageIcon={imageIcon} image={formData?.content.image} />
      </div>
    </div>
  )
}

export { Header }
