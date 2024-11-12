import { FormEvent, MouseEvent } from 'react'

import { MuseumIcon } from '@/app/icons/MuseumIcon'
import { UserIcon } from '@/app/icons/UserIcon'
import { ClientType, MessageType } from '@/types'

import { GetInputClientConfigType } from './formClient/configClient/getInputClientConfig'
import InputArea from './formClient/inputArea'
import FormFooter from './formFooter'
import FormHeader from './formheader'
import Timeline from './timeline'

interface FormProps {
  title: string
  handleArrowLeft: () => void
  getInput: GetInputClientConfigType[][]
  currentStep: number
  step: number
  message: MessageType
  handleSubmit: (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => void
  client: ClientType
  handleInputChange: (
    section: string,
    name: string,
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => void
  handleEdit: () => void
  handlePrevStep: () => void
  handleNextStep: () => void
}

const Form = ({
  title,
  handleArrowLeft,
  getInput,
  currentStep,
  step,
  message,
  handleSubmit,
  client,
  handleInputChange,
  handleEdit,
  handlePrevStep,
  handleNextStep,
}: FormProps) => {
  return (
    <div className="grid grid-cols-1 gap-1 p-10 sm:grid-cols-1">
      <FormHeader
        title={title}
        icon={<UserIcon />}
        handleSubmit={handleArrowLeft}
      />
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
        client={client}
        handleInputChange={(section, name, value) => {
          handleInputChange(section, name, value)
        }}
      />
      <FormFooter
        message={message}
        handleEdit={handleEdit}
        currentStep={currentStep}
        step={step}
        handlePrevStep={handlePrevStep}
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
