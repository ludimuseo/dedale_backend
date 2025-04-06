import { type FC } from 'react'

import { ButtonWithIcon } from './ButtonWithIcon'

interface RightSideBarProps {
  relectureIcon: string
  cocheValideIcon: string
  handleProofReading: () => void
  handleConfirmSubmitText: () => void
  showProofReading: boolean
  validateText: boolean
}
const RightSideBar: FC<RightSideBarProps> = ({
  relectureIcon,
  cocheValideIcon,
  handleProofReading,
  handleConfirmSubmitText,
  showProofReading,
  validateText,
}) => {
  return (
    <div className="order-1 flex flex-col items-center space-y-4 p-4 lg:order-none">
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

export { RightSideBar }
