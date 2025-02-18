import { useAppDispatch } from '@hook'
import { UnknownAction } from '@reduxjs/toolkit'
import type { RootState } from '@service/redux'
import {
  clearWord,
  fetchDefinition,
  setWord,
} from '@service/redux/slices/reducerDictionary'
import { ThunkDispatch } from 'redux-thunk'

import { DefinitionTooltip } from './definitionTooltip'

interface TextWrapperProps {
  text: string
}

export const TextWrapper: React.FC<TextWrapperProps> = ({ text }) => {
  const dispatch: ThunkDispatch<RootState, void, UnknownAction> =
    useAppDispatch()

  const handleDoubleClick = () => {
    dispatch(clearWord())
    const selection = window.getSelection()
    if (selection) {
      const word = selection.toString().trim()
      if (word) {
        // const x = event.clientX
        // const y = event.clientY
        dispatch(setWord({ word }))
        void dispatch(fetchDefinition(word)) // Fetch definition
      }
    }
  }

  return (
    <DefinitionTooltip>
      <p className="text-center text-xl font-bold" onClick={handleDoubleClick}>
        {text}
      </p>
    </DefinitionTooltip>
  )
}
