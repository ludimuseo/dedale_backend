import { PlaceType, StepType } from '@/types'

interface StepDropdownListProps {
  title: string
  selectedJourneyId: number | undefined
  handleSelectStep?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  steps?: StepType[] | undefined
}

export default function StepDropdownList({
  title,
  handleSelectStep,
  selectedJourneyId,
  steps,
}: StepDropdownListProps) {
  if (!selectedJourneyId || title === 'Formulaire Etape') {
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
          Associer une Etape:
        </option>
        {steps?.map(({ id, name }, index) => {
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
