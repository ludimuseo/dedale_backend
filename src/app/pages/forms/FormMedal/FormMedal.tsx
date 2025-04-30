import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { fetchWithAuth } from '@/api/fetchWithAuth'
import { getStandardDescriptionConfig } from '@/app/components/description/getDescriptionConfig'
import { useAppSelector } from '@/app/hooks'
import { useTimelineStep } from '@/app/hooks/useTimelineStep'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { MedalType, MessageType, State } from '@/types'

import Form from '../Form'
import { getInputMedalConfig } from './configMedal/getInputMedalConfig'

const FormMedal: FC = () => {
  const navigate = useNavigate()
  const title = 'Formulaire Médaille'
  const [showDescription, setShowDescription] = useState(false)
  const [message, setMessage] = useState<MessageType>({
    info: '',
    result: false,
  })
  const { token }: StateAuth = useAppSelector((state: State) => state.auth)

  const [formData, setFormData] = useState<MedalType>({
    id: 0,
    name: '',
    image: '',
    type: 'LIEU',
    level: '',
    placeId: 0,
    journeyId: 0,
    stepId: 0,
  })
  const {
    step,
    setStep,
    currentStep,
    setCurrentStep,
    handleNextStep,
    handlePrevStep,
  } = useTimelineStep()

  const getInput = !showDescription
    ? getInputMedalConfig
    : getStandardDescriptionConfig

  const handleArrowLeft = () => {
    void navigate(-1)
  }

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleDescription = () => {
    //AFFICHER Descritpion
    setShowDescription(true)
    setCurrentStep(0)
  }

  //soumission des informations
  const handleSubmit = async (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (showDescription) {
      setMessage(() => ({
        info: 'Vos descriptions ont été envoyées avec succès !',
        result: true,
      }))
    } else {
      setMessage(() => ({
        info: 'Votre formulaire a été envoyé avec succès !',
        result: true,
      }))
    }

    try {
      const response: Response = await fetch(
        `https://dev.ludimuseo.fr:4000/api/`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ medal: formData }),
        }
      )

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${String(response.status)}`)
      }
      const newId: number = (await response.json()) as number
      console.log('newId from Server', newId)
    } catch (error) {
      console.error('Erreur:', error)
      setMessage({
        info: "Erreur lors de l'envoi du formulaire",
        result: true,
      })
    }
  }

  const handleFileUpload = async (
    file: File,
    fileType: string,
    name: string,
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault()
    const formUpload = new FormData()
    // Ajout des données dans formUpload
    formUpload.append('file', file) // le fichier image à uploader
    formUpload.append('type', 'image') // type : image ou audio
    formUpload.append('destination', 'Step') // ou journey, step, etc.

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [fileType]: name,
      }
    })

    try {
      const response: Response = await fetchWithAuth(
        'https://dev.ludimuseo.fr:4000/api/upload',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formUpload, // Attention : pas de Content-Type ici, FormData le gère
        }
      )

      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status.toString()}`)
      }
      const data: unknown = await response.json()
      console.log('Fichier uploadé avec succès :', data)
    } catch (error) {
      console.error("Erreur lors de l'upload :", error)
      throw error
    }
  }

  useEffect(() => {
    setStep(getInput.length)
    setMessage({
      info: '',
      result: false,
    })
  }, [getInput])

  console.log('FormData:', { ...formData })

  return (
    <Form
      title={title}
      icon={<></>}
      handleArrowLeft={handleArrowLeft}
      getInput={getInput}
      currentStep={currentStep}
      step={step}
      message={message}
      handleSubmit={(event) => {
        void handleSubmit(event)
      }}
      formData={formData}
      handleInputChange={(name, value) => {
        handleInputChange(name, value)
      }}
      handleDescription={handleDescription}
      handlePrevStep={handlePrevStep}
      handleNextStep={handleNextStep}
      handleFileUpload={(file, fileType, name, event) => {
        void handleFileUpload(file, fileType, name, event)
      }}
    />
  )
}

export { FormMedal }
