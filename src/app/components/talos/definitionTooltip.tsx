interface DefinitionTooltipProps {
  word: string
  position: { x: number; y: number } | null
}

const DefinitionTooltip: React.FC<DefinitionTooltipProps> = ({
  word,
  position,
}) => {
  if (!position) return null

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y + 10,
        left: position.x + 10,
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      }}>
      <strong>{word}</strong>: {}
    </div>
  )
}

export { DefinitionTooltip }
