import { useLocation } from 'react-router'

import TalosInterfaceMain from '@/app/components/Talos/main/TalosInterfaceMain'
import {
  EntityWithId,
  GameType,
  JourneyType,
  PieceType,
  PlaceType,
  StepType,
} from '@/types'

type FormData = EntityWithId<
  PlaceType | JourneyType | StepType | PieceType | GameType
>

interface LocationState {
  formData: FormData
}

const TalosInterface = () => {
  const location = useLocation()
  const state = location.state as LocationState
  const { formData } = state

  return (
    <div>
      <TalosInterfaceMain formData={formData} />
    </div>
  )
}

export { TalosInterface }
