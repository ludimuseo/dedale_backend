interface BottomSuggestionFormType {
  isSending: boolean
  onClose: () => void
}

export default function BottomSuggestionForm({
  isSending,
  onClose,
}: BottomSuggestionFormType) {
  return (
    <div className="mt-6 flex justify-end gap-4">
      <button
        disabled={isSending}
        onClick={() => {
          onClose()
        }}
        className={`rounded px-4 py-2 text-white focus:ring focus:ring-opacity-50 ${
          isSending
            ? 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-300'
            : 'bg-red-500 hover:bg-red-600 focus:ring-red-300'
        }`}
        aria-label="Abandonner">
        Abandonner
      </button>
      <button
        disabled={isSending}
        type="submit"
        className={`rounded px-4 py-2 text-white ${
          isSending
            ? 'bg-gray-500 hover:bg-gray-600 focus:ring focus:ring-gray-300 focus:ring-opacity-50'
            : 'bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50'
        }`}
        aria-label="Confirmer">
        Confirmer
      </button>
    </div>
  )
}
