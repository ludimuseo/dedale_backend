import React from 'react'

interface ArrowIconProps {
  isOpen: boolean
  onClick?: () => void
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full border-2 bg-[#0A184D] p-1 transition-colors duration-200 hover:border-[#0A184D] hover:bg-[#ffffff] hover:text-[#0A184D]"
      aria-label={isOpen ? 'Masquer' : 'Afficher'}>
      <svg
        className={`h-10 w-10 transition-transform duration-200 ${
          isOpen ? 'rotate-90' : ''
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  )
}
