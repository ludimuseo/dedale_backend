import ButtonWithIcon from './buttonWithIcon'

interface RightSideBarProps {
  relectureIcon: string
  cocheValideIcon: string
  handleProofReading: () => void
  handleConfirmSubmitText: () => void
  showProofReading: boolean
  validateText: boolean
}
const RightSideBar = ({
  relectureIcon,
  cocheValideIcon,
  handleProofReading,
  handleConfirmSubmitText,
  showProofReading,
  validateText,
}: RightSideBarProps) => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <ButtonWithIcon
        text={showProofReading ? 'Modifier le texte' : 'Relire le texte'}
        iconSrc={relectureIcon}
        handleClick={handleProofReading}
        altText="Relire le texte"
      />
      {validateText && (
        <ButtonWithIcon
          text="Valider le texte"
          handleClick={handleConfirmSubmitText}
          iconSrc={cocheValideIcon}
          altText="Valider le texte"
        />
      )}
    </div>
  )
}

export default RightSideBar
