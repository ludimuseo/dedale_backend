import { JourneyType } from '@/types'

interface JourneyDropdownListProps {
  selectedPlaceId: number | undefined
  handleSelectJourney?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  journey?: JourneyType[] | undefined
}

export default function JourneyDropdownList({
  handleSelectJourney,
  selectedPlaceId,
  journey,
}: JourneyDropdownListProps) {
  if (!selectedPlaceId) {
    return <></>
  }
  return (
    <div className="navbar rounded-xl bg-base-100 shadow-xl">
      <div className="navbar-start">
        <a className="btn btn-ghost font-inclusive text-3xl">Parcours: </a>
        <p className="font-inclusive text-2xl">{}</p>
      </div>
      <select
        onChange={handleSelectJourney}
        defaultValue=""
        className="select-neutral select w-full font-inclusive text-xl">
        <option disabled value="">
          Associer un Parcours:
        </option>
        {journey?.map(({ id, name }, index) => {
          return (
            <option key={index} value={id as unknown as keyof JourneyType}>
              {name as keyof JourneyType}
            </option>
          )
        })}
      </select>
    </div>
  )
}
