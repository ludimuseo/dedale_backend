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
    <div className="dark:border-strokedark dark:bg-boxdark flex flex-col rounded-sm border bg-white px-20">
      <div className="flex flex-row justify-center">
        {message.result ? (
          <>
            <button
              className="mx-8 mb-8 mt-8 flex justify-center rounded bg-blue-900 p-3 font-bold text-white hover:bg-opacity-100"
              onClick={handleEdit}>
              {icon && icon}
              <span className="ml-2 mt-1">{`Editer un Lieu `}</span>
            </button>
          </>
        ) : currentStep < step - 1 ? (
          <>
            {currentStep > 0 && (
              <>
                <button
                  className="mx-8 mb-8 mt-8 flex justify-center rounded bg-blue-900 p-3 font-bold text-white hover:bg-opacity-100"
                  onClick={handlePrevStep}>
                  {`<- Précédent`}
                </button>
                <br />
              </>
            )}
            <button
              className="mx-8 mb-8 mt-8 flex justify-center rounded bg-blue-900 p-3 font-bold text-white hover:bg-opacity-100"
              onClick={handleNextStep}>
              {`Suivant ->`}
            </button>
          </>
        ) : (
          <>
            <button
              className="mx-8 mb-8 mt-8 flex justify-center rounded bg-blue-900 p-3 font-bold text-white hover:bg-opacity-100"
              onClick={handlePrevStep}>
              {`<- Précédent`}
            </button>
            <br />
            <button
              className="mx-8 mb-8 mt-8 flex justify-center rounded bg-rose-400 p-3 font-bold text-white hover:bg-opacity-100"
              onClick={(event) => {
                handleSubmit(event)
              }}>
              {/*Add void because Promise-returning function provided to attribute where a void return was expected  */}
              VALIDER
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default FormFooter
