import { ArrowIcon } from '../../ui/icons/ArrowIcon'

interface NavigationHeaderProps {
  key: string
  isOpen: boolean
  label: string
  openNav: (isOpen: boolean) => void
}

export default function NavigationHeader({
  isOpen,
  label,
  openNav,
  key,
}: NavigationHeaderProps) {
  return (
    <div className="group relative flex items-center justify-between">
      <h2
        id={key}
        className="flex-grow rounded-md bg-[#0A184D] pl-3 text-3xl font-semibold leading-relaxed text-white">
        {label}
      </h2>

      <button
        onClick={() => {
          openNav(isOpen)
        }}
        className="bg-transparent px-4 py-6 text-white"
        aria-label={isOpen ? `Masquer les ${label}` : `Afficher les ${label}`}>
        <ArrowIcon isOpen={isOpen} />
      </button>
    </div>
  )
}
