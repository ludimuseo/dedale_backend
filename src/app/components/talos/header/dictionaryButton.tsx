import { useAppDispatch, useAppSelector } from '@hook/index'
import { UnknownAction } from '@reduxjs/toolkit'
import type { RootState } from '@service/redux'
import {
  fetchDefinition,
  setWord,
  StateDictionnary,
} from '@service/redux/slices/reducerDictionary'
import { ThunkDispatch } from 'redux-thunk'

import { State } from '@/types'

export const DictionaryButton: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, UnknownAction> =
    useAppDispatch()
  const { selectedWord, definition, loading, error }: StateDictionnary =
    useAppSelector((state: State) => state.dictionary)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    dispatch(setWord({ word: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (selectedWord) {
      const result = dispatch(fetchDefinition(selectedWord))
      console.log('result', result)
    }
  }
  return (
    <div className="form-control relative ml-20">
      <form onSubmit={handleSubmit} className="flex-row">
        <input
          type="text"
          placeholder="Dictionnaire"
          value={selectedWord ?? ''}
          onChange={handleChange}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <button className="btn btn-square" type="submit" value="🔎">
          🔎
        </button>
      </form>
      {loading && <p>Chargement...</p>}
      {error && <p>Impossible de charger la définition</p>}
      {definition && (
        <p className="absolute top-full bg-slate-200 text-[#0a184d]">
          <strong>{selectedWord}</strong>: {definition}
        </p>
      )}
    </div>
  )
}
