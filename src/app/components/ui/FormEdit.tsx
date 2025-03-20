/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { FormCard } from '@/app/components/ui/FormCard'
import { ClientType, GetInputConfigType, PlaceType } from '@/types'

import { Dropdown } from './Dropdown'
import { Input } from './Input'

interface FormEditProps extends ComponentPropsWithoutRef<'form'> {
  handleSubmit: (event: React.FormEvent) => void
  resetForm: () => void
  handleChange: (event: React.ChangeEvent) => void
  isModified: boolean
  inputs: GetInputConfigType[][]
  errors: Record<string, string[] | undefined>
  datas: PlaceType | ClientType
}

const FormEdit = forwardRef<HTMLFormElement, FormEditProps>(
  (
    {
      handleSubmit,
      resetForm,
      handleChange,
      inputs,
      datas,
      isModified,
      errors,
    },
    ref
  ) => {
    return (
      <form onSubmit={handleSubmit} ref={ref}>
        <div
          style={{ backgroundColor: '#f1f5f9', top: '-12px' }}
          className="sticky z-50 flex justify-end gap-2 p-5">
          <button
            onClick={resetForm}
            disabled={!isModified}
            type="button"
            className="btn btn-outline">
            Annuler
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isModified}>
            Valider
          </button>
        </div>
        {inputs.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <FormCard title={section[0].sectionLabel}>
              {section.map((el, sectionKey) => {
                const sectionData = datas[
                  el.section as keyof typeof datas
                ] as Record<string, string>
                let value = sectionData[el.name]

                if (
                  el.section === 'description' &&
                  el.mode &&
                  sectionData[el.mode]
                ) {
                  value = el.language
                    ? sectionData[el.mode][el.language] || ''
                    : value
                } else if (
                  el.section === 'audio' &&
                  el.mode &&
                  sectionData[el.mode]
                ) {
                  value = el.language
                    ? sectionData[el.mode][el.language] || ''
                    : value
                }

                return (
                  <div key={sectionKey} className="sm:col-span-6">
                    {el.type === 'text' && (
                      <Input
                        insideForm
                        uid={el.id}
                        name={el.name}
                        placeholder=""
                        label={el.label}
                        errors={errors[el.id] ?? []}
                        onChange={handleChange}
                        value={value}
                        className="input input-bordered w-full"
                      />
                    )}
                    {el.type === 'number' && (
                      <Input
                        insideForm
                        uid={el.id}
                        name={el.name}
                        placeholder=""
                        label={el.label}
                        errors={errors[el.id] ?? []}
                        onChange={handleChange}
                        value={value}
                        className="input input-bordered w-full"
                        type="number"
                      />
                    )}
                    {el.option && (
                      <Dropdown
                        insideForm
                        uid={el.id}
                        name={el.name}
                        placeholder=""
                        label={el.label}
                        errors={errors[el.id] ?? []}
                        value={el.name}
                        onChange={handleChange}
                        options={el.option}
                      />
                    )}
                    {el.type === 'file' && (
                      <input
                        type="file"
                        id={el.id}
                        name={el.name}
                        accept={el.accessType}
                        onChange={handleChange}
                        className="file-input file-input-bordered w-full"
                      />
                    )}
                  </div>
                )
              })}
            </FormCard>
          </div>
        ))}
      </form>
    )
  }
)

export { FormEdit }
