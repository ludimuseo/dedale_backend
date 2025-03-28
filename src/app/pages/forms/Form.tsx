import { MuseumIcon } from '@component'
import React, { FormEvent, MouseEvent } from 'react'

import { GetInputConfigType, MessageType, T } from '@/types'

import FormFooter from './FormFooter'
import FormHeader from './FormHeader'
import InputArea from './InputArea'
import Timeline from './Timeline'

interface FormProps {
  clientIdAndName?: { id: string; name: string }[] | undefined
  placeIdAndName?: { docId: string; name: string }[] | undefined
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
  handleSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handlePlaceSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  selectedOption?: string
  selectedPlaceOption?: string
}

const Form = ({
  //clientIdAndName,
  //placeIdAndName,
  title,
  icon,
  handleArrowLeft,
  // attributedMedal,
  // handleAttributeMedal,
  // medalsData,
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
  // handleSelect,
  // handlePlaceSelect,
  handleResponseChange,
  // selectedOption,
  // selectedPlaceOption,
}: FormProps) => {
  // const [journeyIdAndName, setJourneyIdAndName] = useState<{ id: string; name: string }[] | undefined>([])
  // const [stepIdAndName, setStepAndName] = useState<{ id: string; name: string }[] | undefined>([])
  // const [pieceIdAndName, setPiecedAndName] = useState<{ id: string; name: string }[] | undefined>([])

  //fetchJourney

  //fetchStep

  //fetchPiece

  //fetchGame

  return (
    <div className="grid grid-cols-1 gap-1 p-10 sm:grid-cols-1">
      <FormHeader title={title} icon={icon} handleSubmit={handleArrowLeft} />
      <>
        <Timeline
          getInput={getInput}
          currentStep={currentStep}
          step={step}
          message={message}
        />
        <InputArea
          message={message}
          getInput={getInput}
          currentStep={currentStep}
          formData={formData}
          // Callback functions ?
          handleSubmit={(event) => {
            handleSubmit(event)
          }}
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
          handleResponseChange={(section, name, mode, language, value) => {
            handleResponseChange?.(section, name, mode, language, value)
          }}
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
    </div>
  )
}

export default Form
