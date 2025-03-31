import { type FC } from 'react'

interface ChangeFontSizeBarProps {
  handleDecreaseFontSize: () => void
  handleIncreaseFontSize: () => void
}

const ChangeFontSizeBar: FC<ChangeFontSizeBarProps> = ({
  handleDecreaseFontSize,
  handleIncreaseFontSize,
}) => {
  return (
    <div className="flex flex-col justify-start gap-1">
      <button
        className="btn-square bg-white"
        onClick={handleDecreaseFontSize}
        aria-label="Diminuer la taille de la police">
        <p className="text-base text-[#0a184d]">A</p>
      </button>
      <button
        className="btn-square bg-white"
        onClick={handleIncreaseFontSize}
        aria-label="Augmenter la taille de la police">
        <p className="text-3xl text-[#0a184d]">A</p>
      </button>
    </div>
  )
}

export { ChangeFontSizeBar }
