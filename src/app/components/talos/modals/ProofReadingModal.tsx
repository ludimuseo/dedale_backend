import { type FC } from 'react'

interface ProofReadingModalProps {
  handleProofReading: () => void
  handleLeaveProofReading: () => void
}

const ProofReadingModal: FC<ProofReadingModalProps> = ({
  handleProofReading,
  handleLeaveProofReading,
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
          Quitter la correction
        </h2>
        <p id="modal-description" className="mb-6 text-sm text-gray-600">
          Vous n'avez pas validé le texte en cours de relecture, voulez-vous
          vraiment abandonner la correction? Si vous abandonnez, votre
          progression sera quand même sauvegardée.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              handleLeaveProofReading()
            }}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:ring focus:ring-red-300 focus:ring-opacity-50"
            aria-label="Abandonner">
            Abandonner
          </button>
          <button
            onClick={() => {
              handleProofReading()
            }}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            aria-label="Confirmer">
            Relire et valider le texte
          </button>
        </div>
      </div>
    </div>
  )
}

export { ProofReadingModal }
