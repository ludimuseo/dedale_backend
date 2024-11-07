import { type FC, useEffect, useState } from 'react'

import { getInputClientConfig } from './configClient/getInputClientConfig'

const FormClient: FC = () => {
  const [step, setStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const handleNextStep = () => {
    if (currentStep === step - 1) return
    setCurrentStep(currentStep + 1)
  }
  const handlePrevStep = () => {
    if (currentStep === 0) return
    setCurrentStep(currentStep - 1)
  }

  const getInput = getInputClientConfig

  useEffect(() => {
    setStep(getInput.length)
    console.log('data:', getInput[2][0].category)
  }, [getInput])

  return (
    <>
      {/*CONTAINER */}
      <div className="grid grid-cols-1 gap-1 bg-yellow-500 sm:grid-cols-1">
        {/*SELECTION AREA */}
        <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
          <span>SELECTION AREA</span>
        </div>

        {/*NAVIGATION AREA */}
        <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
          <span>NAVIGATION AREA</span>
        </div>

        {/*TIMELINE AREA */}
        <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
          <h3>TIMELINE AREA</h3>
          <h1>
            {currentStep + 1}/{step}
          </h1>
          <br />
          <span>{getInput[currentStep][0].category}</span>
        </div>

        {/*INPUT AREA CONTAINER*/}
        <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark flex flex-col rounded-sm border bg-white p-10">
          <span>INPUT AREA CONTAINER</span>

          {/*INPUT AREA 1*/}
          <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-blue-800"></div>
          <h2>-- INPUT AREA 1 --</h2>

          {getInput[currentStep].map((inputs) => {
            return (
              <div>
                <span>{inputs.label}</span>
                <input
                  id={inputs.id}
                  className="border-stroke focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-1/3 rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition disabled:cursor-default dark:text-white"
                  placeholder={inputs.placeholder}
                  type={inputs.type}
                />
              </div>
            )
          })}

          {/*INPUT AREA 2*/}
          <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-blue-800"></div>
          <span>INPUT AREA 2</span>
        </div>

        {/*STEP AREA */}
        <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-red-500">
          <span>STEP AREA</span>
          <div>
            {currentStep < step - 1 ? (
              <>
                {currentStep === 1 && (
                  <>
                    <button onClick={handlePrevStep}>Précédent</button>
                    <br />
                  </>
                )}
                <button onClick={handleNextStep}>Suivant</button>
              </>
            ) : (
              <>
                <button onClick={handlePrevStep}>Précédent</button>
                <br />
                <button onClick={handleNextStep}>VALIDER</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default FormClient
