// src/app/components/faq/FaqQuestion.tsx
import React, { useState } from 'react'

// props du composant FaqQuestion
interface FaqQuestionProps {
  question: string // Texte de la question
  answer: string // Texte de la réponse
  image?: string // URL de l'image associée à la réponse (optionnel)
}

// Composant fonctionnel FaqQuestion
const FaqQuestion: React.FC<FaqQuestionProps> = ({
  question,
  answer,
  image,
}) => {
  // État local pour gérer l'ouverture/fermeture de la réponse
  const [isOpen, setIsOpen] = useState(false)

  // Fonction pour basculer l'état de la réponse
  const toggleAnswer = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="rounded-lg border bg-white p-4 shadow dark:bg-gray-800">
      {/* Bouton pour basculer l'état de la réponse */}
      <button
        onClick={toggleAnswer}
        className="w-full text-left focus:outline-none">
        <h4 className="text-lg font-medium">{question}</h4>
      </button>
      {/* Affichage conditionnel de la réponse */}
      {isOpen && (
        <div className="mt-2">
          {/* Affichage conditionnel de l'image */}
          {image && (
            <img
              src={image}
              alt="texte-alternative"
              className="mb-2 h-auto w-full rounded"
            />
          )}
          <p className="text-gray-700 dark:text-gray-200">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default FaqQuestion
