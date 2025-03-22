interface AddDescriptionButtonProps {
  handleAddDesc: () => void
}

export default function AddDescriptionButton({
  handleAddDesc,
}: AddDescriptionButtonProps) {
  return (
    <div>
      {' '}
      <button
        onClick={handleAddDesc}
        className="btn btn-primary mt-2 w-1/3 font-inclusive text-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Ajouter une description
      </button>
    </div>
  )
}
