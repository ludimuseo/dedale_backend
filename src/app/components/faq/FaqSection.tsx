// src/app/components/faq/FaqSection.tsx
import React from 'react'

import FaqQuestion from '@/app/components/faq/FaqQuestion'
import Tag from '@/app/components/faq/Tag'

//structure des données d'une section de FAQ
interface FAQSection {
  _id: string // Identifiant unique de la section
  title: string // Titre de la section
  description: string // Description de la section
  tags: { label: string; color: string }[] // Tableau de tags associés à la section
  contents: {
    _id: string // Identifiant unique du contenu
    sectionId: string // Identifiant de la section à laquelle le contenu appartient
    title: string // Titre de la question
    text: string // Texte de la réponse
    image?: string // URL de l'image associée à la réponse (optionnel)
  }[]
}

// props du composant FaqSection
interface FaqSectionProps {
  section: FAQSection // Données de la section de FAQ
  isActive: boolean // Indique si la section est actuellement (ouverte)
  onToggle: () => void // Fonction appelée pour basculer l'état actif de la section
}

// Composant fonctionnel FaqSection
const FaqSection: React.FC<FaqSectionProps> = ({
  section,
  isActive,
  onToggle,
}) => {
  return (
    <div className="rounded-lg border bg-white p-4 shadow dark:bg-gray-800">
      {/* Bouton pour basculer l'état actif de la section */}
      <button
        onClick={onToggle}
        className="w-full text-left focus:outline-none">
        <h2 className="text-xl font-semibold">{section.title}</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {section.description}
        </p>
      </button>
      {isActive && (
        <div className="mt-4">
          {/* Intégration des Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {section.tags.map((tag, index) => (
              // Affichage de chaque tag en utilisant le composant Tag
              <Tag key={index} label={tag.label} color={tag.color} />
            ))}
          </div>
          {/* Liste des Questions */}
          <div className="space-y-2">
            {section.contents.map((content) => (
              // Affichage de chaque question en utilisant le composant FaqQuestion
              <FaqQuestion
                key={content._id}
                question={content.title}
                answer={content.text}
                image={content.image}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FaqSection
