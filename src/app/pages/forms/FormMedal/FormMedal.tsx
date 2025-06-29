/* eslint-disable react-hooks/exhaustive-deps */
import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { fetchWithAuth } from '@/api/fetchWithAuth'
import { getDescriptionConfig } from '@/app/components/description/getDescriptionConfig'
import { useAppSelector } from '@/app/hooks'
import { useTimelineStep } from '@/app/hooks/useTimelineStep'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { API_BASE_URL } from '@/config/config'
import { MedalType, MessageType, State } from '@/types'

import Form from '../Form'
import { getInputMedalConfig } from './configMedal/getInputMedalConfig'

const FormMedal: FC = () => {
  const navigate = useNavigate()
  const title = 'Formulaire Médaille'
  const collection = 'medals'
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
  })
  const {
    step,
    setStep,
    currentStep,
    setCurrentStep,
    handleNextStep,
    handlePrevStep,
  } = useTimelineStep()

  const getInput = !showDescription ? getInputMedalConfig : getDescriptionConfig

  const handleArrowLeft = () => {
    void navigate(-1)
  }

  const handleInputChange = <K extends keyof MedalType>(
    name: K,
    value: MedalType[K]
  ): void => {
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

    if (!token) {
      alert("Une erreur c'est produite, reconnectez-vous")
      void navigate('/auth/signin')
      return
    }

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
      const response: Response = await fetchWithAuth(
        `${API_BASE_URL}/medals/create`,
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
        info: "Erreur lors de l'envoi du formulaire !",
        result: false,
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

    if (!token) {
      alert("Une erreur c'est produite, reconnectez-vous")
      void navigate('/auth/signin')
      return
    }

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [fileType]: name,
      }
    })

    try {
      const response: Response = await fetchWithAuth(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formUpload, // Attention : pas de Content-Type ici, FormData le gère
      })

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
      collection={collection}
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
