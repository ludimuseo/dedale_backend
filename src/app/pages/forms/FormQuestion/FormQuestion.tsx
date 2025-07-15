/* eslint-disable react-hooks/exhaustive-deps */
import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { ClientResponse } from '@/api/fetchClient'
import { fetchWithAuth } from '@/api/fetchWithAuth'
import { useAppSelector } from '@/app/hooks'
import { useTimelineStep } from '@/app/hooks/useTimelineStep'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import {
  ClientType,
  JourneyType,
  MessageType,
  PlaceType,
  QuestionType,
  State,
  StepType,
} from '@/types'

import Form from '../Form'
import { getInputQuestionConfig } from '../FormGame/configGame/getInputTextGameConfig'
import { PlaceResponse } from '../FormPiece/FormPiece'

const FormQuestion: FC = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState<MessageType>({
    info: '',
    result: false,
  })
  //const [newIdFromApi, setNewIdFromApi] = useState<number>() //recup l'id du quiz pour les questions
  const title = 'Formulaire Question'
  const collection = 'games'
  const [client, setClient] = useState<ClientType[]>([])
  const [place, setPlace] = useState<PlaceType[]>([])
  const [journey, setJourney] = useState<JourneyType[]>([])
  const [stepData, setStepData] = useState<StepType[]>()
  const [selectedClientId, setSelectedClientId] = useState<number>()
  const [selectedPlaceId, setSelectedPlaceId] = useState<number>()
  const [selectedJourneyId, setSelectedJourneyId] = useState<number>()
  const { token }: StateAuth = useAppSelector((state: State) => state.auth)
  const getInput = getInputQuestionConfig

  const [formData, setFormData] = useState<QuestionType>({
    id: 0,
    stepId: 0,
    image: '',
    audio: '',
    level: '',
    languageCode: 'fr',
    question: '',
    responseTrue: '',
    response2: '',
    response3: '',
    explanationResponseTrue: '',
    explanationResponse2: '',
    explanationResponse3: '',
    isFalc: false,
    isValidate: false,
    certifiedBy: 0,
  })

  const handleArrowLeft = () => {
    void navigate(-1)
  }
  const {
    step,
    setStep,
    currentStep,
    setCurrentStep,
    handleNextStep,
    handlePrevStep,
  } = useTimelineStep()

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSelectClient = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    const selectedValueToNumber = Number(selectedValue)
    setSelectedClientId(selectedValueToNumber)
  }

  const handleSelectPlace = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    const selectedValueToNumber = Number(selectedValue)
    setSelectedPlaceId(selectedValueToNumber)
  }

  const handleSelectJourney = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    const selectedValueToNumber = Number(selectedValue)
    setSelectedJourneyId(selectedValueToNumber)
  }

  const handleSelectStep = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    const selectedValueToNumber = Number(selectedValue)
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        ['stepId']: selectedValueToNumber,
      }
    })
  }

  const handleSubmit = (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    console.log('submit')
  }

  //soumission de la Question
  const handleSubmitQuestion = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    //ENVOIE a l'API
    console.log('question submition', formData)
    try {
      const response: Response = await fetchWithAuth(
        `https://dev.ludimuseo.fr:4000/api/games/createQuestion`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: formData }),
        }
      )
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${String(response.status)}`)
      }
      const newId: number = (await response.json()) as number
      console.log('newId from Server', newId)
      //setCurrentStep(0) //retour saisir une autre question
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
    const fetchClients = async () => {
      if (!token) {
        alert("Une erreur c'est produite, reconnectez-vous")
        void navigate('/auth/signin')
        return
      }

      try {
        const response: Response = await fetchWithAuth(
          `https://dev.ludimuseo.fr:4000/api/clients/list`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${String(response.status)}`)
        }
        const data = (await response.json()) as ClientResponse
        const clientData = data.clients
        const filteredClientIsActive = clientData.filter(
          (item) => item.isActive
        )
        setClient([...filteredClientIsActive])
      } catch (error) {
        console.log('ERROR fetching clients: ', error)
      }
    }
    void fetchClients()
  }, [])

  useEffect(() => {
    const fetchPlace = async () => {
      if (!token) {
        alert("Une erreur c'est produite, reconnectez-vous")
        void navigate('/auth/signin')
        return
      }
      if (!selectedClientId) return
      try {
        const response: Response = await fetchWithAuth(
          `https://dev.ludimuseo.fr:4000/api/places/list/${selectedClientId.toString()}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${String(response.status)}`)
        }
        const data = (await response.json()) as PlaceResponse
        const placeData = data.places
        setPlace(placeData)
      } catch (error) {
        setPlace([])
        console.log('ERROR fetching places: ', error)
      }
    }
    void fetchPlace()
  }, [selectedClientId])

  useEffect(() => {
    const fetchJourney = async () => {
      if (!token) {
        alert("Une erreur c'est produite, reconnectez-vous")
        void navigate('/auth/signin')
        return
      }
      if (!selectedPlaceId) return
      try {
        const response: Response = await fetchWithAuth(
          `https://dev.ludimuseo.fr:4000/api/journeys/getAllJourneysByPlaceId/${selectedPlaceId.toString()}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${String(response.status)}`)
        }
        const data = (await response.json()) as JourneyType[]
        const journeyData = data
        setJourney(journeyData)
      } catch (error) {
        setJourney([])
        console.log('ERROR fetching journeys: ', error)
      }
    }
    void fetchJourney()
  }, [selectedPlaceId])

  useEffect(() => {
    const fetchStep = async () => {
      if (!token) {
        alert("Une erreur c'est produite, reconnectez-vous")
        void navigate('/auth/signin')
        return
      }
      if (!selectedJourneyId) return
      try {
        const response: Response = await fetchWithAuth(
          `https://dev.ludimuseo.fr:4000/api/steps/find/${selectedJourneyId.toString()}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${String(response.status)}`)
        }
        const stepData = (await response.json()) as StepType[]
        console.log('Fetch StepData from GAME: ', stepData)
        setStepData(stepData)
      } catch (error) {
        setStepData([])
        console.log('ERROR fetching steps: ', error)
      }
    }
    void fetchStep()
  }, [selectedJourneyId])

  useEffect(() => {
    setStep(getInput.length)
    setCurrentStep(0)
    setMessage({
      info: '',
      result: false,
    })
  }, [getInput])

  console.log('FormQuestion:', { ...formData })

  return (
    <Form
      handleSubmitQuestion={(e) => {
        void handleSubmitQuestion(e)
      }}
      client={client}
      place={place}
      journey={journey}
      stepData={stepData}
      isAssociated={formData.stepId !== 0}
      selectedClientId={selectedClientId}
      selectedPlaceId={selectedPlaceId}
      selectedJourneyId={selectedJourneyId}
      //newIdFromApi={newIdFromApi}
      handleSelectClient={handleSelectClient}
      handleSelectPlace={handleSelectPlace}
      handleSelectJourney={handleSelectJourney}
      handleSelectStep={handleSelectStep}
      title={title}
      collection={collection}
      icon={<></>}
      handleArrowLeft={handleArrowLeft}
      getInput={getInput}
      currentStep={currentStep}
      step={step}
      message={message}
      handleSubmit={(event) => {
        handleSubmit(event)
      }}
      formData={formData}
      handleInputChange={(name, value) => {
        handleInputChange(name, value)
      }}
      handlePrevStep={handlePrevStep}
      handleNextStep={handleNextStep}
      handleFileUpload={(file, fileType, name, event) => {
        void handleFileUpload(file, fileType, name, event)
      }}
    />
  )
}

export { FormQuestion }
