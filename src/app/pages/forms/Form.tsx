import React, { FormEvent, MouseEvent } from 'react'

import Description from '@/app/components/description/Description'
import ClientDropdownList from '@/app/components/forms/ClientDropdownList'
import PlaceDropdownList from '@/app/components/forms/PlaceDropdownList'
import {
  ClientType,
  GetInputConfigType,
  JourneyType,
  MessageType,
  PlaceType,
  StepType,
  T,
} from '@/types'

import FormFooter from './FormFooter'
import FormHeader from './FormHeader'
import InputArea from './InputArea'
import Timeline from './Timeline'

interface FormProps {
  client?: ClientType[] | undefined
  place?: PlaceType[]
  isAssociated?: boolean
  newIdFromApi?: number
  selectedClientId?: number
  selectedPlaceId?: number
  showDescription?: boolean
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
  handleDescription?: () => void
  handlePrevStep: () => void
  handleNextStep: () => void
  handleSubmit: (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => void
  formData: T | PlaceType | ClientType | JourneyType | StepType
  handleInputChange: (name: string, event: string) => void
  handleFileUpload?: (file: File, fileType: string, name: string) => void
  handleSelectClient?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleSelectPlace?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  selectedOption?: number
  selectedPlaceOption?: string
}

const Form = ({
  client,
  place,
  isAssociated,
  selectedClientId,
  //selectedPlaceId,
  showDescription,
  newIdFromApi,
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
  handleDescription,
  handlePrevStep,
  handleNextStep,
  handleFileUpload,
  handleSelectClient,
  handleSelectPlace,
}: FormProps) => {
  return (
    <div className="grid grid-cols-1 gap-2 p-10 sm:grid-cols-1">
      <FormHeader title={title} icon={icon} handleSubmit={handleArrowLeft} />
      <ClientDropdownList
        title={title}
        client={client}
        handleSelectClient={handleSelectClient}
      />
      <PlaceDropdownList
        selectedClientId={selectedClientId}
        handleSelectPlace={handleSelectPlace}
        place={place}
      />
      {isAssociated || title === 'Formulaire Client' ? (
        <Timeline
          getInput={getInput}
          currentStep={currentStep}
          step={step}
          message={message}
        />
      ) : (
        <></>
      )}

      {isAssociated || title === 'Formulaire Client' ? (
        !showDescription ? (
          <InputArea
            message={message}
            getInput={getInput}
            currentStep={currentStep}
            formData={formData}
            handleSubmit={(event) => {
              handleSubmit(event)
            }}
            handleInputChange={(name, value) => {
              handleInputChange(name, value)
            }}
            handleFileUpload={(file, fileType, name) => {
              handleFileUpload?.(file, fileType, name)
            }}
          />
        ) : (
          <Description
            getInput={getInput}
            currentStep={currentStep}
            newIdFromApi={newIdFromApi ?? 0}
          />
        )
      ) : (
        <></>
      )}
      {isAssociated || title === 'Formulaire Client' ? (
        <FormFooter
          title={title}
          message={message}
          handleDescription={handleDescription}
          showDescription={showDescription ?? false}
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
      ) : (
        <></>
      )}
    </div>
  )
}

export default Form
