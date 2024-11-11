import { addDoc, collection } from 'firebase/firestore'
import { type FC, FormEvent, MouseEvent, useEffect, useState } from 'react'

import { MuseumIcon } from '@/app/icons/MuseumIcon'
import { UserIcon } from '@/app/icons/UserIcon'
import { db } from '@/firebase/firebase'
import { ClientType, MessageType } from '@/types'

import FormFooter from '../formFooter'
import FormHeader from '../formheader'
import Timeline from '../timeline'
import { getInputClientConfig } from './configClient/getInputClientConfig'
import InputArea from './inputArea'

const FormClient: FC = () => {
  const [step, setStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [message, setMessage] = useState<MessageType>({
    info: '',
    result: false,
  })
  const [client, setClient] = useState<ClientType>({
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
      const docRef = await addDoc(collection(db, 'clients'), { client })
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

  const handleInputChange = <
    S extends keyof ClientType,
    K extends keyof ClientType[S],
  >(
    section: S,
    name: K,
    value: ClientType[S][K]
  ) => {
    setClient((prevClient) => ({
      ...prevClient,
      [section]: {
        ...prevClient[section],
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
      <div className="grid grid-cols-1 gap-1 p-10 sm:grid-cols-1">
        <FormHeader
          title={'Formulaire Client'}
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
          handleSubmit={(event) => void handleSubmit(event)}
          getInput={getInput}
          currentStep={currentStep}
          client={client}
          handleInputChange={() => handleInputChange}
        />
        <FormFooter
          message={message}
          handleEdit={handleEditPlace}
          currentStep={currentStep}
          step={step}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleSubmit={(event) => void handleSubmit(event)}
          icon={<MuseumIcon />}
        />
      </div>
    </>
  )
}

export default FormClient
