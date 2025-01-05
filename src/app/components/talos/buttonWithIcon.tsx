import React from 'react'

interface ButtonWithIconProps {
  text: string
  iconSrc: string // Chemin de l'image
  altText?: string // Texte alternatif pour l'accessibilité
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  text,
  iconSrc,
  altText = 'Icon',
}) => {
  return (
    <button className="flex h-48 w-32 flex-col items-center justify-center rounded-lg border-2 border-red-400 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-700">
      <span className="text-center font-medium text-[#0a184d]">{text}</span>
      <img src={iconSrc} alt={altText} className="mt-4 h-16 w-16" />
    </button>
  )
}

export default ButtonWithIcon
