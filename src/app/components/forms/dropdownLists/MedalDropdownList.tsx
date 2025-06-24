import { MedalType } from '@/types'

interface MedalDropdownListProps {
  title: string
  handleSelectMedal?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  medal?: MedalType[] | undefined
}

export default function MedalDropdownList({
  title,
  handleSelectMedal,
  medal,
}: MedalDropdownListProps) {
  if (
    title === 'Formulaire Quiz' ||
    title === 'Formulaire Médaille' ||
    title === 'Formulaire Question' ||
    title === 'Formulaire Client'
  ) {
    return <></>
  }
  return (
    <div className="navbar rounded-xl bg-base-100 shadow-xl">
      <div className="navbar-start">
        <a className="ml-4 font-inclusive text-3xl">Medaille: </a>
        <p className="font-inclusive text-2xl">{}</p>
      </div>
      <select
        onChange={handleSelectMedal}
        defaultValue=""
        className="select-neutral select w-full font-inclusive text-xl">
        <option disabled value="">
          Associer un une médaille:
        </option>
        {medal?.map(({ id, name }, index) => {
          return (
            <option key={index} value={id as unknown as keyof MedalType}>
              {name as keyof MedalType}
            </option>
          )
        })}
      </select>
    </div>
  )
}
