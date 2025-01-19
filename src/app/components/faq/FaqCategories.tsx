// src/app/components/faq/FaqCategories.tsx
import React from 'react'

import Tag from '@/app/components/faq/Tag'

//la structure des données d'une catégorie de FAQ
interface FAQCategory {
  _id: string // Identifiant unique de la catégorie
  title: string // Titre de la catégorie
  description: string // Description de la catégorie
  tags: { label: string; color: string }[] // Tableau de tags associés à la catégorie
}

// props du composant FaqCategories
interface FaqCategoriesProps {
  categories: FAQCategory[] // Tableau de catégories de FAQ
  onSelectCategory: (categoryId: string) => void // Fonction appelée lors de la sélection d'une catégorie
  selectedCategoryId: string | null // Identifiant de la catégorie actuellement sélectionnée
}

// Composant fonctionnel FaqCategories
const FaqCategories: React.FC<FaqCategoriesProps> = ({
  categories,
  onSelectCategory,
  selectedCategoryId,
}) => {
  return (
    // Conteneur principal des catégories
    <aside className="h-full w-60 overflow-y-auto rounded-lg bg-primary p-4 text-white">
      {/* Liste des catégories */}
      <ul className="space-y-2">
        {categories.map((cat) => (
          // Élément de liste pour chaque catégorie
          <li
            key={cat._id}
            onClick={() => {
              onSelectCategory(cat._id)
            }}
            className={`cursor-pointer rounded-lg p-3 transition-colors ${
              selectedCategoryId === cat._id
                ? 'bg-secondary-dark' // Couleur de fond pour la catégorie sélectionnée
                : 'hover:bg-secondary/60' // Couleur de fond au survol pour les catégories non sélectionnées
            }`}>
            {/* Titre de la catégorie */}
            <h3 className="text-base font-semibold">{cat.title}</h3>
            {/* Description de la catégorie */}
            <p className="text-xs text-gray-200">{cat.description}</p>
            {/* Intégration des Tags */}
            <div className="mt-2">
              {cat.tags.map((tag, index) => (
                // Affichage de chaque tag en utilisant le composant Tag
                <Tag key={index} label={tag.label} color={tag.color} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default FaqCategories
