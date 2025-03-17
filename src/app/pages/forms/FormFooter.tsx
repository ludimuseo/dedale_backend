import React, { FormEvent, MouseEvent } from 'react'

import { MessageType } from '@/types'

interface FormFooterProps {
  message: MessageType
  handleEdit: () => void
  currentStep: number
  step: number
  handlePrevStep: () => void
  handleNextStep: () => void
  handleSubmit: (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => void
  icon?: React.JSX.Element
}

const FormFooter = ({
  message,
  handleEdit,
  currentStep,
  step,
  handlePrevStep,
  handleNextStep,
  handleSubmit,
  icon,
}: FormFooterProps) => {
  return (
    <div className="dark:border-strokedark dark:bg-boxdark mt-5 flex flex-col rounded-sm px-20">
      <div className="flex flex-row justify-center">
        {message.result ? (
          <>
            <button
              className="mx-8 mb-8 mt-8 flex justify-center rounded bg-blue-900 p-3 font-bold text-white hover:bg-opacity-100"
              onClick={() => {
                handleEdit()
              }}>
              {icon && icon}
              <span className="ml-2 mt-1">{`Editer un Lieu `}</span>
            </button>
          </>
        ) : currentStep < step - 1 ? (
          <>
            {currentStep > 0 && (
              <div className="mr-10">
                <button className="btn btn-primary" onClick={handlePrevStep}>
                  {`<- Précédent`}
                </button>
                <br />
              </div>
            )}
            <button className="btn btn-primary" onClick={handleNextStep}>
              {`Suivant ->`}
            </button>
          </>
        ) : (
          <div className="flex flex-row">
            <button className="btn btn-primary mr-10" onClick={handlePrevStep}>
              {`<- Précédent`}
            </button>
            <br />
            <button
              className="btn btn-secondary"
              onClick={(event) => {
                handleSubmit(event)
              }}>
              VALIDER
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FormFooter
