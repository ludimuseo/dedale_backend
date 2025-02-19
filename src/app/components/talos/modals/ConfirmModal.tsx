import { type FC } from 'react'

interface ConfirmModalProps {
  setIsConfirmSubmitFalcText: (isConfirm: boolean) => void
  handleValidate: () => void
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  setIsConfirmSubmitFalcText,
  handleValidate,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2
          id="modal-title"
          className="mb-4 text-xl font-semibold text-gray-800">
          Envoyer
        </h2>
        <p id="modal-description" className="mb-6 text-sm text-gray-600">
          Êtes-vous sûr de vouloir envoyer le texte?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              setIsConfirmSubmitFalcText(false)
            }}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:ring focus:ring-red-300 focus:ring-opacity-50"
            aria-label="Abandonner">
            Abandonner
          </button>
          <button
            onClick={() => {
              handleValidate()
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

export { ConfirmModal }
