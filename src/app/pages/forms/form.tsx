import { FormEvent, MouseEvent } from 'react'

import { MuseumIcon } from '@/app/components/ui/icons/MuseumIcon'
//import { UserIcon } from '@/app/components/ui/icons/UserIcon'
import { GetInputConfigType, MessageType, T } from '@/types'

import FormFooter from './formFooter'
import FormHeader from './formheader'
import InputArea from './inputArea'
import Timeline from './timeline'

interface FormProps {
  idAndDocName?: { id: string; name: string }[] | undefined
  title: string
  icon: React.JSX.Element
  handleArrowLeft: () => void
  attributedMedal?: {
    id: string
    name: string
    image: string
    description: string
  }
  handleAttributeMedal?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  medalsData?: { id: string; name: string; image: string }[] | undefined
  getInput: GetInputConfigType[][]
  currentStep: number
  step: number
  message: MessageType
  handleEdit: () => void
  handlePrevStep: () => void
  handleNextStep: () => void
  handleSubmit: (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => void
  formData: T
  handleInputChange: <S extends keyof T, K extends keyof T[S]>(
    section: S,
    name: K,
    event: T[S][K]
  ) => void
  handleChange?: <
    S extends keyof T,
    M extends keyof T[S],
    L extends keyof T[S][M],
  >(
    section: S,
    mode: M,
    language: L,
    event: T[S][M][L]
  ) => void
  handleFileUpload?: (
    file: File,
    fileType: string,
    section: string,
    name: string
  ) => void
  handleSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  selectedOption?: string
}

const Form = ({
  idAndDocName,
  title,
  icon,
  handleArrowLeft,
  attributedMedal,
  handleAttributeMedal,
  medalsData,
  getInput,
  currentStep,
  step,
  message,
  handleSubmit,
  formData,
  handleInputChange,
  handleChange,
  handleEdit,
  handlePrevStep,
  handleNextStep,
  handleFileUpload,
  handleSelect,
  selectedOption,
}: FormProps) => {
  return (
    <div className="grid grid-cols-1 gap-1 p-10 sm:grid-cols-1">
      <FormHeader title={title} icon={icon} handleSubmit={handleArrowLeft} />

      {title === 'Formulaire Client' ? (
        <></>
      ) : (
        <>
          <label htmlFor="my_modal_6" className="btn">
            Choisir le Client
          </label>

          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="text-lg font-bold">Client</h3>

              <p className="py-4">Sélection du client lié au Lieu</p>

              <select
                value={selectedOption}
                onChange={handleSelect}
                className="select select-bordered select-xs w-full max-w-xs">
                <option>Choisir le client</option>
                {idAndDocName?.map(({ id, name }, index) => (
                  <option key={index} value={id}>
                    {name}
                  </option>
                ))}
              </select>

              <div className="modal-action">
                <label htmlFor="my_modal_6" className="btn">
                  Fermer
                </label>
              </div>
            </div>
          </div>
        </>
      )}
      {handleAttributeMedal ? (
        <>
          <div className="hero-content flex-col lg:flex-row">
            <select
              value={attributedMedal?.id ?? ''}
              onChange={handleAttributeMedal}
              className="select select-info w-full max-w-xs">
              <option value="">Associer une Médaille</option>
              {medalsData?.map((medal, index) => (
                <option key={index} value={medal.id}>
                  {medal.name}
                </option>
              ))}
            </select>
            <div className="flex flex-row">
              <p className="mr-6 py-6">
                {attributedMedal?.description ??
                  'Aucune description disponible'}
              </p>
              <img
                src={attributedMedal?.image ?? ''}
                alt={attributedMedal?.name ?? 'Image de la médaille'}
                className="max-h-24 rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {selectedOption || title === 'Formulaire Client' ? (
        <>
          <Timeline
            getInput={getInput}
            currentStep={currentStep}
            step={step}
            message={message}
          />
          <InputArea
            message={message}
            handleSubmit={(event) => {
              handleSubmit(event)
            }}
            getInput={getInput}
            currentStep={currentStep}
            formData={formData}
            handleInputChange={(section, name, value) => {
              handleInputChange(section, name, value)
            }}
            handleChange={(section, mode, language, value) => {
              if (handleChange !== undefined)
                handleChange(section, mode, language, value)
            }}
            handleFileUpload={(file, fileType, section, name) =>
              handleFileUpload?.(file, fileType, section, name)
            }
          />
          <FormFooter
            message={message}
            handleEdit={handleEdit}
            currentStep={currentStep}
            step={step}
            handlePrevStep={() => {
              handlePrevStep()
            }}
            handleNextStep={handleNextStep}
            handleSubmit={(event) => {
              handleSubmit(event)
            }}
            icon={<MuseumIcon />}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Form
