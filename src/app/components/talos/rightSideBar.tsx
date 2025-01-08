import ButtonWithIcon from './buttonWithIcon'

interface RightSideBarProps {
  relectureIcon: string
  cocheValideIcon: string
}
const RightSideBar = ({
  relectureIcon,
  cocheValideIcon,
}: RightSideBarProps) => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <ButtonWithIcon
        text="Relire le texte"
        iconSrc={relectureIcon}
        altText="Relire le texte"
      />
      <ButtonWithIcon
        text="Valider le texte"
        iconSrc={cocheValideIcon}
        altText="Valider le texte"
      />
    </div>
  )
}

export default RightSideBar
