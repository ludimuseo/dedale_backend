import { T } from '@/types'

interface TextAreaType {
  id: string
  label: string
  name: string
  placeholder?: string
  rows: number
  mode?: string
  formData: T
  section: string
  language?: string
  rightSideVisible?: boolean
  handleChange: <
    S extends keyof T,
    M extends keyof T[S],
    L extends keyof T[S][M],
  >(
    section: S,
    mode: M,
    language: L,
    event: T[S][M][L]
  ) => void
  handleInputChange: <S extends keyof T, K extends keyof T[S]>(
    section: S,
    name: K,
    event: T[S][K]
  ) => void
  handleResponseChange?: <
    S extends keyof T,
    M extends keyof T[S],
    L extends keyof T[S][M],
    F extends keyof T[S][M][L],
  >(
    section: S,
    name: M,
    mode: L,
    language: F,
    event: T[S][M][L][F]
  ) => void
}
export default function TextArea({
  id,
  label,
  name,
  placeholder,
  rows,
  mode,
  formData,
  section,
  language,
  rightSideVisible,
  handleChange,
  handleInputChange,
  handleResponseChange,
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
        className="textarea textarea-bordered"
        placeholder={placeholder}
        rows={rows}
        value={
          section === 'response'
            ? formData[section][name as keyof T[keyof T]][
                mode as keyof T[keyof T[keyof T]]
              ][language ?? 'fr']
            : mode
              ? formData[section][mode as keyof T[keyof T]][language ?? 'fr']
              : formData[section][name as keyof T[keyof T]]
        }
        onChange={(e) => {
          if (mode) {
            handleChange(
              section,
              mode as keyof T[keyof T],
              language as T[keyof T][keyof T[keyof T]],
              e.target.value as T[keyof T][keyof T[keyof T[keyof T]]]
            )
          } else if (section === 'response' || section === 'explanation') {
            handleResponseChange?.(
              section,
              name as keyof T[keyof T],
              mode as T[keyof T][keyof T[keyof T]],
              language as T[keyof T][keyof T[keyof T[keyof T]]],
              e.target.value as T[keyof T][keyof T[keyof T[keyof T[keyof T]]]]
            )
          } else {
            handleInputChange(
              section,
              name as keyof T[keyof T],
              e.target.value as T[keyof T][keyof T[keyof T]]
            )
          }
        }}
      />
    </div>
  )
}
