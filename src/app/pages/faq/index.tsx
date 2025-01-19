// src/app/pages/faq/index.tsx
import { useState } from 'react'

import FaqCategories from '@/app/components/faq/FaqCategories'
import FaqSection from '@/app/components/faq/FaqSection'

// Données fictives pour les catégories. Remplacez par des données réelles ou une API.
const faqCategories = [
  {
    _id: '64a1f9e2f8a9c2b3e4d5f6g7',
    title: "Utilisation de l'application",
    description:
      "Guide pour comprendre les fonctionnalités principales de l'application.",
    tags: [
      { label: 'parcours', color: 'bg-green-200 text-green-800' },
      { label: 'création', color: 'bg-blue-200 text-blue-800' },
    ],
  },
  {
    _id: '64a1f9e2f8a9c2b3e4d5f6g8',
    title: 'Gestion de Compte',
    description: 'Informations sur la gestion de votre compte utilisateur.',
    tags: [
      { label: 'gestion', color: 'bg-yellow-200 text-yellow-800' },
      { label: 'sécurité', color: 'bg-red-200 text-red-800' },
    ],
  },
  // Ajoutez d'autres catégories ici
]

// Données fictives pour les sections. Remplacez par des données réelles ou une API.
const faqSections = [
  {
    _id: '64b2g9h2i8j9k3l4m5n6o7p8',
    categoryId: '64a1f9e2f8a9c2b3e4d5f6g7',
    title: "Création d'un parcours",
    description: 'Apprenez à créer et gérer vos parcours interactifs.',
    tags: [
      { label: 'parcours', color: 'bg-green-200 text-green-800' },
      { label: 'création', color: 'bg-blue-200 text-blue-800' },
    ],
    contents: [
      {
        _id: '64c3h9i2j8k9l4m5n6o7p9q1',
        sectionId: '64b2g9h2i8j9k3l4m5n6o7p8',
        title: 'Ajouter un nouveau parcours',
        text: "Pour ajouter un nouveau parcours, rendez-vous dans la section 'Parcours', puis cliquez sur 'Ajouter'. Remplissez les champs requis et validez.",
        image: 'https://example.com/images/add-path.png',
        createdAt: new Date('2025-01-01T10:00:00Z'),
        updatedAt: new Date('2025-01-01T12:00:00Z'),
      },
      // Ajoutez d'autres contenus ici
    ],
  },
  {
    _id: '64b2g9h2i8j9k3l4m5n6o8p0',
    categoryId: '64a1f9e2f8a9c2b3e4d5f6g7',
    title: 'Comment ajouter du Contenu ?',
    description: 'Découvrez comment ajouter du contenu à vos parcours.',
    tags: [{ label: 'contenu', color: 'bg-purple-200 text-purple-800' }],
    contents: [
      {
        _id: '64c3h9i2j8k9l4m5n6o7p9q2',
        sectionId: '64b2g9h2i8j9k3l4m5n6o8p0',
        title: 'Comment insérer des Images ?',
        text: "Pour insérer des images, utilisez le bouton 'Image' dans l'éditeur de parcours.",
        image: 'https://example.com/images/insert-image.png',
        createdAt: new Date('2025-02-01T10:00:00Z'),
        updatedAt: new Date('2025-02-01T12:00:00Z'),
      },
      // Ajoutez d'autres contenus ici
    ],
  },
  {
    _id: '64b2g9h2i8j9k3l4m5n6o8p0',
    categoryId: '64a1f9e2f8a9c2b3e4d5f6g8',
    title: 'Création de compte',
    description: 'Decouvrer comment créer un compte',
    tags: [{ label: 'compte', color: 'bg-purple-200 text-purple-800' }],
    contents: [
      {
        _id: '64c3h9i2j8k9l4m5n6o7p9q2',
        sectionId: '64b2g9h2i8j9k3l4m5n6o8p0',
        title: 'Lorem ipsum dolor sit ame ?',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        image: 'https://example.com/images/insert-image.png',
        createdAt: new Date('2025-02-01T10:00:00Z'),
        updatedAt: new Date('2025-02-01T12:00:00Z'),
      },
      {
        _id: '64c3h9i2j8k9l4m5n6o7p9q2',
        sectionId: '64b2g9h2i8j9k3l4m5n6o8p0',
        title: 'Lorem ipsum dolor sit ame ?',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        image: 'https://example.com/images/insert-image.png',
        createdAt: new Date('2025-02-01T10:00:00Z'),
        updatedAt: new Date('2025-02-01T12:00:00Z'),
      },
      // Ajoutez d'autres contenus ici
    ],
  },
  // Ajoutez d'autres sections ici
]

export function FAQ() {
  // État pour la catégorie sélectionnée
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  // État pour la section active
  const [activeSection, setActiveSection] = useState<string | null>(null)

  // Fonction pour gérer la sélection d'une catégorie
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setActiveSection(null) // Réinitialiser la section active lors de la sélection d'une nouvelle catégorie
  }

  // Fonction pour basculer l'état actif d'une section
  const handleToggleSection = (sectionId: string) => {
    setActiveSection((prev) => (prev === sectionId ? null : sectionId))
  }

  // Filtrer les sections en fonction de la catégorie sélectionnée
  const filteredSections = faqSections.filter(
    (section) => section.categoryId === selectedCategory
  )

  // Trouver la catégorie sélectionnée pour afficher son titre
  const selectedCategoryData = faqCategories.find(
    (cat) => cat._id === selectedCategory
  )

  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* Section Catégories */}
      <FaqCategories
        categories={faqCategories}
        onSelectCategory={handleSelectCategory}
        selectedCategoryId={selectedCategory}
      />

      {/* Section Contenu Principal */}
      <div className="bg-antiFlashWhite dark:bg-darkGunmetal flex-1 overflow-y-auto p-4">
        {!selectedCategory ? (
          <div className="mt-10 text-center text-gray-500">
            Sélectionnez une catégorie pour afficher les questions.
          </div>
        ) : (
          <div>
            <h1 className="mb-4 text-2xl font-bold">
              Sections de la Catégorie : {selectedCategoryData?.title}
            </h1>
            <div className="space-y-4">
              {filteredSections.map((section) => (
                <FaqSection
                  key={section._id}
                  section={section}
                  isActive={activeSection === section._id}
                  onToggle={() => {
                    handleToggleSection(section._id)
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FAQ
