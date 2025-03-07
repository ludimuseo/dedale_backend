import { useState } from 'react'

import { useAppSelector } from '@/app/hooks'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { State } from '@/types'

interface SuggestionModalProps {
  isOpen: boolean
  onClose: () => void
  name: string | undefined
  category: string | undefined
}

const SuggestionModal = ({
  isOpen,
  onClose,
  name,
  category,
}: SuggestionModalProps) => {
  const { user }: StateAuth = useAppSelector((state: State) => state.auth)

  const [suggestionText, setSuggestionText] = useState<string>('')
  const [suggestionImg, setSuggestionImg] = useState<File | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSuggestionImg(event.target.files[0])
    }
  }

  // TODO
  const sendSuggestion = () => {
    console.log(suggestionText)
  }

  if (!isOpen) return null
  return (
    <div className="modal modal-open" role="dialog">
      <div className="modal-box relative">
        <button
          className="btn btn-circle btn-primary btn-sm absolute right-2 top-2"
          onClick={() => {
            onClose()
          }}>
          <span className="font-extrabold text-stone-50">✕</span>
        </button>
        <h2
          id="modal-title"
          className="mb-4 text-xl font-semibold text-gray-800">
          Envoyer une suggestion
        </h2>

        <textarea
          className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Écrivez votre suggestion..."
          value={suggestionText}
          onChange={(e) => {
            setSuggestionText(e.target.value)
          }}></textarea>

        <div className="mt-3">
          <input
            type="file"
            onChange={handleImageUpload}
            className="hidden"
            id="imageUpload"
          />
          <label
            htmlFor="imageUpload"
            className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Ajouter une image
          </label>
          {suggestionImg && (
            <p className="mt-1 text-sm text-gray-600">{suggestionImg.name}</p>
          )}
        </div>

        <div className="mt-4 rounded-md bg-gray-100 p-3 text-sm">
          <p>
            <strong>Utilisateur:</strong> {user?.pseudo && 'Inconnu'}
          </p>
          <p>
            <strong>Date:</strong> {new Date().toLocaleDateString()}
          </p>
          <p>
            <strong>Titre du texte:</strong> {name}
          </p>
          <p>
            <strong>Catégorie:</strong> {category}
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => {
              onClose()
            }}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:ring focus:ring-red-300 focus:ring-opacity-50"
            aria-label="Abandonner">
            Abandonner
          </button>
          <button
            onClick={() => {
              sendSuggestion()
            }}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            aria-label="Confirmer">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuggestionModal
