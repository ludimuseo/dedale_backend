import ButtonWithIcon from './buttonWithIcon'

interface Props {
  imprimerIcon: string
  ajoutTexteIcon: string
  dicteeIcon: string
  grasIcon: string
}

const LeftSideBar = ({
  imprimerIcon,
  ajoutTexteIcon,
  dicteeIcon,
  grasIcon,
}: Props) => {
  return (
    <div className="flex items-start space-x-4">
      {/* Left Sidebar Buttons */}
      <div className="flex flex-col space-y-4 p-4">
        <ButtonWithIcon
          text="Imprimer"
          iconSrc={imprimerIcon}
          altText="Imprimer"
        />
        <ButtonWithIcon
          text="Ajouter du texte"
          iconSrc={ajoutTexteIcon}
          altText="Ajouter du texte"
        />
        <ButtonWithIcon
          text="Dicter du texte"
          iconSrc={dicteeIcon}
          altText="Dicter du texte"
        />
        <ButtonWithIcon text="Gras" iconSrc={grasIcon} altText="Gras" />
      </div>
    </div>
  )
}

export default LeftSideBar
