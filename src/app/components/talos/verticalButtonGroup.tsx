import React from 'react'

interface ButtonGroupProps {
  buttons: {
    iconSrc: string // Chemin de l'image
    altText: string // Texte alternatif pour l'image
    bgColor: string // Couleur de fond pour chaque bouton
    onClick: () => void // Fonction appelée au clic
  }[]
}

const VerticalButtonGroup: React.FC<ButtonGroupProps> = ({ buttons }) => {
  return (
    <div className="mt-4 flex h-48 w-20 flex-col items-center justify-between space-y-4 rounded-lg border-2 border-[#0a184d] bg-white p-4 shadow-lg">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className={`flex items-center justify-center rounded-full ${button.bgColor} shadow-md transition-transform hover:scale-105`}>
          <img
            src={button.iconSrc}
            alt={button.altText}
            className="h-10 w-10"
          />
        </button>
      ))}
      <div className="flex h-10 w-10 items-center justify-center text-[#0a184d]"></div>
    </div>
  )
}

export default VerticalButtonGroup
