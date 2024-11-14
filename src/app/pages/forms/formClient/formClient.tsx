import { addDoc, collection } from 'firebase/firestore'
import { type FC, FormEvent, MouseEvent, useEffect, useState } from 'react'

import { db } from '@/firebase/firebase'
import { MessageType, T } from '@/types'

import Form from '../form'
import { getInputClientConfig } from './configClient/getInputClientConfig'

const FormClient: FC = () => {
  const [step, setStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [message, setMessage] = useState<MessageType>({
    info: '',
    result: false,
  })
  const [formData, setFormData] = useState<T>({
    address: {
      address: '',
      city: '',
      country: '',
      postal: '',
    },
    company: {
      name: '',
      siret: '',
      tva: '',
      type: '',
      website: '',
    },
    contact: {
      email: '',
      name: '',
      note: '',
      tel: '',
    },
    status: {
      isActive: true, //ACTIVER/DESACTIVER LE CLIENT
    },
  })

  const handleNextStep = () => {
    if (currentStep === step - 1) return
    setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    if (currentStep === 0) return
    setCurrentStep(currentStep - 1)
  }
  const handleEditPlace = () => {
    alert('Edit Place')
  }

  const handleArrowLeft = () => {
    alert('Back to Dashboard')
  }

  //soumission des informations
  const handleSubmit = async (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    try {
      const docRef = await addDoc(collection(db, 'clients'), { formData })
      const id = docRef.id
      if (id) {
        setMessage(() => ({
          info: 'Votre formulaire a été envoyé avec succès !',
          result: true,
        }))
      }
    } catch (error) {
      console.error("Erreur sur l'envoi du formulaire", error)
      setMessage(() => ({
        info: "Erreur lors de l'envoi du formulaire",
        result: false,
      }))
    }
  }

  const handleInputChange = <S extends keyof T, K extends keyof T[S]>(
    section: S,
    name: K,
    value: T[S][K]
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [name]: value,
      },
    }))
  }

  const getInput = getInputClientConfig

  useEffect(() => {
    setStep(getInput.length)
  }, [getInput])

  return (
    <>
      <Form
        title={'Formulaire Client'}
        handleArrowLeft={handleArrowLeft}
        getInput={getInput}
        currentStep={currentStep}
        step={step}
        message={message}
        handleSubmit={(event) => void handleSubmit(event)}
        formData={formData}
        handleInputChange={(section, name, value) => {
          handleInputChange(section, name, value)
        }}
        handleEdit={handleEditPlace}
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
      />
    </>
  )
}

export default FormClient
