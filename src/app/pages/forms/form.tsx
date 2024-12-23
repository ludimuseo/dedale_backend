import { FormEvent, MouseEvent } from 'react'

import { MuseumIcon } from '@/app/components/ui/icons/MuseumIcon'
//import { UserIcon } from '@/app/components/ui/icons/UserIcon'
import { GetInputConfigType, MessageType, T } from '@/types'

import FormFooter from './formFooter'
import FormHeader from './formheader'
import InputArea from './inputArea'
import Timeline from './timeline'

interface FormProps {
  title: string
  icon: React.JSX.Element
  handleArrowLeft: () => void
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
}

const Form = ({
  title,
  icon,
  handleArrowLeft,
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
}: FormProps) => {
  return (
    <div className="grid grid-cols-1 gap-1 p-10 sm:grid-cols-1">
      <FormHeader title={title} icon={icon} handleSubmit={handleArrowLeft} />
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
          if (typeof handleChange !== 'undefined') {
            handleChange(section, mode, language, value)
          }
        }}
        handleFileUpload={handleFileUpload}
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
    </div>
  )
}

export default Form
