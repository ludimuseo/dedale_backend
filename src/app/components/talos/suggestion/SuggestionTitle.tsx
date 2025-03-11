interface SuggestionTitlePropsType {
  title: string
}

export default function SuggestionTitle({ title }: SuggestionTitlePropsType) {
  return (
    <h2 id="modal-title" className="mb-4 text-xl font-semibold text-gray-800">
      {title}
    </h2>
  )
}
