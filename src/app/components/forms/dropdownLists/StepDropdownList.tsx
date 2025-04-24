import { PlaceType, StepType } from '@/types'

interface StepDropdownListProps {
  selectedJourneyId: number | undefined
  handleSelectStep?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  step?: StepType[] | undefined
}

export default function PlaceDropdownList({
  handleSelectStep,
  selectedJourneyId,
  step,
}: StepDropdownListProps) {
  if (!selectedJourneyId) {
    return <></>
  }
  return (
    <div className="navbar rounded-xl bg-base-100 shadow-xl">
      <div className="navbar-start">
        <a className="btn btn-ghost font-inclusive text-3xl">Lieu: </a>
        <p className="font-inclusive text-2xl">{}</p>
      </div>
      <select
        onChange={handleSelectStep}
        defaultValue=""
        className="select-neutral select w-full font-inclusive text-xl">
        <option disabled value="">
          Associer un Lieu:
        </option>
        {step?.map(({ id, name }, index) => {
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
