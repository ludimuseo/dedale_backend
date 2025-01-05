import { useLocation } from 'react-router'

import TalosInterfaceMain from '@/app/components/talos/talosInterfaceMain'
import { GameType, JourneyType, PieceType, PlaceType, StepType } from '@/types'

type FormData = PlaceType | JourneyType | StepType | PieceType | GameType

interface LocationState {
  formData?: FormData
}

const TalosInterface = () => {
  const location = useLocation()
  const state = location.state as LocationState
  const { formData } = state

  return (
    <>
      <div>TALOS interface</div>
      <div>
        <TalosInterfaceMain formData={formData} />
      </div>
    </>
  )
}

export { TalosInterface }
