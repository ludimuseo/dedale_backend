import { type FC } from 'react'

interface ChangeFontSizeBarProps {
  handleDecreaseFontSize: () => void
  handleIncreaseFontSize: () => void
}

const ChangeFontSizeBar: FC<ChangeFontSizeBarProps> = ({
  handleDecreaseFontSize,
  handleIncreaseFontSize,
}) => {
  const buttonStyle =
    'btn-square rounded-md text-[#0a184d] bg-white hover:text-white hover:bg-[#0a184d] focus:ring focus:ring-blue-300 focus:ring-opacity-50'
  return (
    <div className="flex justify-start gap-1 lg:flex-col">
      <button
        className={buttonStyle}
        onClick={handleDecreaseFontSize}
        aria-label="Diminuer la taille de la police">
        <p className="text-base">A</p>
      </button>
      <button
        className={buttonStyle}
        onClick={handleIncreaseFontSize}
        aria-label="Augmenter la taille de la police">
        <p className="text-3xl">A</p>
      </button>
    </div>
  )
}

export { ChangeFontSizeBar }
