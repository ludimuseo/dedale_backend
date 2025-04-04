import React, { FormEvent, MouseEvent } from 'react'

import Description from '@/app/components/description/Description'
import { GetInputConfigType, MessageType, T } from '@/types'

import FormFooter from './formFooter'
import FormHeader from './formheader'
import InputArea from './InputArea'
import Timeline from './Timeline'

interface FormProps {
  clientIdAndName?: { id: string; name: string }[] | undefined
  placeIdAndName?: { docId: string; name: string }[] | undefined
  newPlaceId: string | undefined
  showDescription: boolean
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
  handleDescription: () => void
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
  handleFileUpload?: (file: File, fileType: string, name: string) => void
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
  showDescription,
  newPlaceId,
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
  handleDescription,
  handlePrevStep,
  handleNextStep,
  handleFileUpload,
  // handleSelect,
  // handlePlaceSelect,
  handleResponseChange,
  // selectedOption,
  // selectedPlaceOption,
}: FormProps) => {
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
        {!showDescription ? (
          <InputArea
            message={message}
            getInput={getInput}
            currentStep={currentStep}
            formData={formData}
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
            handleFileUpload={(file, fileType, name) =>
              handleFileUpload?.(file, fileType, name)
            }
            handleResponseChange={(section, name, mode, language, value) => {
              handleResponseChange?.(section, name, mode, language, value)
            }}
          />
        ) : (
          <Description
            getInput={getInput}
            currentStep={currentStep}
            newPlaceId={newPlaceId}
          />
        )}
        <FormFooter
          title={title}
          message={message}
          handleDescription={handleDescription}
          showDescription={showDescription}
          currentStep={currentStep}
          step={step}
          handlePrevStep={() => {
            handlePrevStep()
          }}
          handleNextStep={handleNextStep}
          handleSubmit={(event) => {
            handleSubmit(event)
          }}
          icon={
            <div className="flex flex-row items-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#4285F4" />

                <path
                  d="M12 6L14 10H18L15 13L17 17L12 15L7 17L9 13L6 10H10L12 6Z"
                  fill="white"
                />
              </svg>
            </div>
          }
        />
      </>
    </div>
  )
}

export default Form
