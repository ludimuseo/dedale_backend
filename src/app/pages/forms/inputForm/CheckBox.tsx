import { T } from '@/types'

interface CheckBoxType {
  isChecked: boolean
  id: string
  name: string
  label: string
  type: string
  section: string
  handleInputChange: <S extends keyof T, K extends keyof T[S]>(
    section: S,
    name: K,
    event: T[S][K]
  ) => void
}
export default function CheckBox({
  isChecked,
  id,
  name,
  label,
  section,
  handleInputChange,
}: CheckBoxType) {
  return (
    <div className="form-control mt-4 flex flex-row" key={id}>
      <label className="label cursor-pointer">
        <span className="label-text mr-7 text-lg">{label}</span>
        <input
          name={name}
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            handleInputChange(section, name as keyof T[keyof T], !isChecked)
          }}
          className="checkbox"
        />
      </label>
    </div>
  )
}
