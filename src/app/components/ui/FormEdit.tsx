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
    console.log(datas)

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
                // Vérification sécurisée du type
                const sectionData = datas[
                  el.section as keyof typeof datas
                ] as Record<string, string>
                const value = sectionData[el.name]
                // const audioValue = sectionData[el.name][el.language];

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
                    {el.type === 'dropdown' && (
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
                    {/* { el.type === 'file' && (
                      <InputFile
                        insideForm
                        uid={el.id}
                        name={el.name}
                        label={el.label}
                        errors={errors[el.id] ?? []}
                        value={audioValue}
                        onChange={handleChange}
                      />
                    )
                    } */}
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
