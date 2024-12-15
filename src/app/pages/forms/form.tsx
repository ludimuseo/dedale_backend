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
  const svgIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24">
      <path
        fill="#000"
        d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  )
  return (
    <div className="grid grid-cols-1 gap-1 p-10 sm:grid-cols-1">
      <FormHeader title={title} icon={svgIcon} handleSubmit={handleArrowLeft} />
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
          handleChange(section, mode, language, value)
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
