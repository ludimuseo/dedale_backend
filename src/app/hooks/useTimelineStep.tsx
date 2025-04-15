import { useState } from 'react'

export const useTimelineStep = () => {
  const [step, setStep] = useState<number>(0)
  const [currentStep, setCurrentStep] = useState<number>(0)

  const handleNextStep = () => {
    if (currentStep === step - 1) return
    setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    if (currentStep === 0) return
    setCurrentStep(currentStep - 1)
  }

  return {
    step,
    setStep,
    currentStep,
    setCurrentStep,
    handleNextStep,
    handlePrevStep,
  }
}
