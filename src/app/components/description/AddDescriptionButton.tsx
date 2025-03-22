interface AddDescriptionButtonProps {
  handleAddDesc: () => void
}

export default function AddDescriptionButton({
  handleAddDesc,
}: AddDescriptionButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      {' '}
      <button
        onClick={handleAddDesc}
        className="btn btn-circle btn-primary mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      <p className="mt-1 font-inclusive text-xl">Ajouter une description</p>
    </div>
  )
}
