import React, { FormEvent, MouseEvent } from 'react'

import Description from '@/app/components/description/Description'
import {
  ClientType,
  GetInputConfigType,
  MessageType,
  PlaceType,
  T,
} from '@/types'

import FormFooter from './formFooter'
import FormHeader from './formheader'
import InputArea from './InputArea'
import Timeline from './Timeline'

interface FormProps {
  client?: ClientType[] | undefined
  isClientId?: boolean
  placeIdAndName?: { docId: string; name: string }[] | undefined
  newPlaceId?: number
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
  formData: T | PlaceType | ClientType
  handleInputChange: (name: string, event: string) => void
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
  handleSelectClient?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handlePlaceSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  selectedOption?: number
  selectedPlaceOption?: string
}

const Form = ({
  client,
  isClientId,
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
  handleSelectClient,
  handleResponseChange,
}: FormProps) => {
  return (
    <div className="grid grid-cols-1 gap-2 p-10 sm:grid-cols-1">
      <FormHeader title={title} icon={icon} handleSubmit={handleArrowLeft} />

      {title !== 'Formulaire Client' ? (
        <div className="navbar rounded-xl bg-base-100 shadow-xl">
          <div className="navbar-start">
            <a className="btn btn-ghost font-inclusive text-3xl">Client: </a>
            <p className="font-inclusive text-2xl">{}</p>
          </div>
          <select
            onChange={handleSelectClient}
            defaultValue=""
            className="select-neutral select w-full font-inclusive text-xl">
            <option disabled value="">
              Associer un client:
            </option>
            {client?.map(({ id, name }, index) => {
              return (
                <option key={index} value={id as unknown as keyof ClientType}>
                  {name as keyof ClientType}
                </option>
              )
            })}
          </select>
        </div>
      ) : (
        <></>
      )}

      {isClientId || title === 'Formulaire Client' ? (
        <Timeline
          getInput={getInput}
          currentStep={currentStep}
          step={step}
          message={message}
        />
      ) : (
        <></>
      )}

      {isClientId || title === 'Formulaire Client' ? (
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
            newPlaceId={newPlaceId ?? 0}
          />
        )
      ) : (
        <></>
      )}
      {isClientId || title === 'Formulaire Client' ? (
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
