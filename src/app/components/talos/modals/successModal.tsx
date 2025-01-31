interface IsSetIsSuccessType {
  setIsSuccess: (isSuccess: boolean) => void
}

const SuccessModal = ({ setIsSuccess }: IsSetIsSuccessType) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-description">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2
            id="success-modal-title"
            className="mb-2 text-xl font-semibold text-gray-800">
            Merci !
          </h2>
          <p
            id="success-modal-description"
            className="mb-6 text-center text-sm text-gray-600">
            Votre texte a été envoyé avec succès.
          </p>
          <button
            onClick={() => {
              setIsSuccess(false)
            }}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:ring focus:ring-green-300 focus:ring-opacity-50"
            aria-label="Fermer">
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
