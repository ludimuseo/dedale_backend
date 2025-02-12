import { useAppDispatch, useAppSelector } from '@hook/index'

import {
  clearWord,
  StateDictionnary,
} from '@/app/services/redux/slices/reducerDictionary'
import { State } from '@/types'

interface DefinitionTooltipProps {
  children: React.ReactNode
}

type tooltipDefinition = string | null

const DefinitionTooltip: React.FC<DefinitionTooltipProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  const {
    // selectedWord,
    definition,
    // position,
    loading,
    error,
  }: StateDictionnary = useAppSelector((state: State) => state.dictionary)

  // if (!selectedWord || !position) return null

  let tooltipDefinition: tooltipDefinition
  if (loading) {
    tooltipDefinition = 'Chargement...'
  } else if (error) {
    tooltipDefinition = 'Impossible de charger la definition'
  } else {
    tooltipDefinition = definition
  }

  return (
    <div
      className="tooltip tooltip-open"
      data-tip={tooltipDefinition}
      onClick={() => dispatch(clearWord())}>
      {children}
    </div>
  )
}

export { DefinitionTooltip }
