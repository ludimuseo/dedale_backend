import { ClientType, JourneyType, PlaceType, StepType, T } from '@/types'

interface TextAreaType {
  id: string
  label: string
  name: string
  placeholder?: string
  rows: number
  mode?: string
  formData: T | PlaceType | ClientType | JourneyType | StepType
  language?: string
  rightSideVisible?: boolean
  handleInputChange: (name: string, event: string) => void
}
export default function TextArea({
  id,
  label,
  name,
  placeholder,
  rows,
  formData,
  rightSideVisible,
  handleInputChange,
}: TextAreaType) {
  return (
    <div
      className={
        rightSideVisible
          ? 'border-stroke shadow-defaul dark:bg-boxdark mt-1 flex w-1/3 flex-col rounded-lg border bg-sky-100 p-2'
          : 'mt-2 flex w-1/2 flex-col'
      }
      key={id}>
      <p className="mb-2 font-inclusive text-xl">{label}</p>

      <textarea
        key={id}
        id={id}
        name={name}
        className="textarea textarea-bordered font-inclusive text-lg"
        placeholder={placeholder}
        rows={rows}
        value={formData[name as keyof T[keyof T]]}
        onChange={(e) => {
          handleInputChange(
            name as keyof T[keyof T],
            e.target.value as T[keyof T][keyof T[keyof T]]
          )
        }}
      />
    </div>
  )
}
