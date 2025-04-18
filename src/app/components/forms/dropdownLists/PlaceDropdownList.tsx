import { PlaceType } from '@/types'

interface PlaceDropdownListProps {
  selectedClientId: number | undefined
  handleSelectPlace?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  place?: PlaceType[] | undefined
}

export default function PlaceDropdownList({
  handleSelectPlace,
  selectedClientId,
  place,
}: PlaceDropdownListProps) {
  if (!selectedClientId) {
    return <></>
  }
  return (
    <div className="navbar rounded-xl bg-base-100 shadow-xl">
      <div className="navbar-start">
        <a className="btn btn-ghost font-inclusive text-3xl">Lieu: </a>
        <p className="font-inclusive text-2xl">{}</p>
      </div>
      <select
        onChange={handleSelectPlace}
        defaultValue=""
        className="select-neutral select w-full font-inclusive text-xl">
        <option disabled value="">
          Associer un Lieu:
        </option>
        {place?.map(({ id, name }, index) => {
          return (
            <option key={index} value={id as unknown as keyof PlaceType}>
              {name as keyof PlaceType}
            </option>
          )
        })}
      </select>
    </div>
  )
}
