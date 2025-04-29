import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { fetchWithAuth } from '@/api/fetchWithAuth'
import { useAppSelector } from '@/app/hooks'
import { useTimelineStep } from '@/app/hooks/useTimelineStep'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import {
  ClientType,
  GameType,
  JourneyType,
  MessageType,
  PlaceType,
  QuizType,
  State,
  StepType,
} from '@/types'

import Form from '../Form'
import {
  getInputQuestionConfig,
  getInputQuizConfig,
} from './configGame/getInputTextGameConfig'

const FormGame: FC = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState<MessageType>({
    info: '',
    result: false,
  })
  const [newIdFromApi, setNewIdFromApi] = useState<number>() //recup l'id du quiz pour les questions
  const title = newIdFromApi ? 'Formulaire Question' : 'Formulaire Quiz'
  const [client, setClient] = useState<ClientType[]>([])
  const [place, setPlace] = useState<PlaceType[]>([])
  const [journey, setJourney] = useState<JourneyType[]>([])
  const [stepData, setStepData] = useState<StepType[]>()
  const [selectedClientId, setSelectedClientId] = useState<number>()
  const [selectedPlaceId, setSelectedPlaceId] = useState<number>()
  const [selectedJourneyId, setSelectedJourneyId] = useState<number>()
  const { token }: StateAuth = useAppSelector((state: State) => state.auth)
  const getInput = newIdFromApi ? getInputQuestionConfig : getInputQuizConfig
  const [formQuiz, setFormQuiz] = useState<QuizType>({
    id: 0,
    stepId: 0,
    level: 'NOVICE',
    name: '',
  })
  const [formData, setFormData] = useState<GameType>({
    id: 0,
    stepId: 0,
    image: '',
    audio: '',
    level: '',
    type: '',
    languageCode: '',
    question: '',
    responseTrue: '',
    response2: '',
    response3: '',
    explanationResponseTrue: '',
    explanationResponse2: '',
    explanationResponse3: '',
    isFalc: false,
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
    setFormQuiz((prevFormData) => ({
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

    setFormQuiz((prevFormData) => {
      return {
        ...prevFormData,
        ['stepId']: selectedValueToNumber,
      }
    })
  }

  //soumission des informations QUIZ
  const handleSubmit = async (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    if (!token) {
      alert("Une erreur c'est produite, reconnectez-vous")
      void navigate('/auth/signin')
      return
    }

    try {
      const response: Response = await fetchWithAuth(
        `https://dev.ludimuseo.fr:4000/api/`, // TODO
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quiz: formQuiz }),
        }
      )

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${String(response.status)}`)
      }
      const newId: number = (await response.json()) as number
      setNewIdFromApi(newId) // recupere l'Id du nouveau place créé

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
  ) => {
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
    const fetchClients = async () => {
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
        const data = (await response.json()) as ClientType[]
        const clientData = data.clients as ClientType[]
        const filteredClientIsActive = clientData.filter(
          (item) => item.isActive
        )
        setClient([...filteredClientIsActive])
      } catch (error) {
        console.log('ERROR fetching clients: ', error)
      }
    }
    void fetchClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchPlace = async () => {
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
        const data = (await response.json()) as PlaceType[]
        const placeData = data.places as PlaceType[]
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

  console.log('FormData:', { ...formData })
  console.log('FormQuiz:', { ...formQuiz })

  return (
    <Form
      client={client}
      place={place}
      journey={journey}
      stepData={stepData}
      isAssociated={formQuiz.stepId !== 0}
      selectedClientId={selectedClientId}
      selectedPlaceId={selectedPlaceId}
      selectedJourneyId={selectedJourneyId}
      newIdFromApi={newIdFromApi}
      handleSelectClient={handleSelectClient}
      handleSelectPlace={handleSelectPlace}
      handleSelectJourney={handleSelectJourney}
      handleSelectStep={handleSelectStep}
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
      handlePrevStep={handlePrevStep}
      handleNextStep={handleNextStep}
      handleFileUpload={void handleFileUpload}
    />
  )
}

export { FormGame }
