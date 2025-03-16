interface SuggestionUserInfoType {
  pseudo: string
  date: string
  name: string
  category: string
}

export default function SuggestionUserInfo({
  pseudo,
  date,
  name,
  category,
}: SuggestionUserInfoType) {
  return (
    <div className="mt-4 rounded-md bg-gray-100 p-3 font-inclusive text-sm">
      <p>Utilisateur: {pseudo}</p>
      <p>Date: {date}</p>
      <p>Titre du texte: {name}</p>
      <p>Catégorie: {category}</p>
    </div>
  )
}
