import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { fetchWithAuth } from '@/api/fetchWithAuth'
import { PlaceIcon } from '@/app/components'
import { getStandardDescriptionConfig } from '@/app/components/description/getDescriptionConfig'
import { useAppSelector } from '@/app/hooks'
import { useTimelineStep } from '@/app/hooks/useTimelineStep'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { ClientType, MessageType, PieceType, State } from '@/types'

import Form from '../Form'
import { getInputPieceConfig } from './configPiece/getInputPieceConfig'

const FormPiece: FC = () => {
  const title = 'Formulaire Oeuvre'
  const navigate = useNavigate()
  const [showDescription, setShowDescription] = useState(false)
  const [client, setClient] = useState<ClientType[]>([])
  // const [place, setPlace] = useState<PlaceType[]>()
  const [selectedClientId, setSelectedClientId] = useState<number>()
  const [selectedPlaceId, setSelectedPlaceId] = useState<number>()
  const [selectedJourneyId, setSelectedJourneyId] = useState<number>()
  const [newIdFromApi, setNewIdFromApi] = useState<number>()
  const [message, setMessage] = useState<MessageType>({
    info: '',
    result: false,
  })
  const [formData, setFormData] = useState<PieceType>({
    id: 0,
    stepId: 0,
    name: '',
    image: '',
    isActive: false,
    isPublished: false,
  })
  const { token }: StateAuth = useAppSelector((state: State) => state.auth)
  const getInput = !showDescription
    ? getInputPieceConfig
    : getStandardDescriptionConfig

  const {
    step,
    setStep,
    currentStep,
    setCurrentStep,
    handleNextStep,
    handlePrevStep,
  } = useTimelineStep()

  const handleDescription = () => {
    //AFFICHER Descritpion
    setShowDescription(true)
    setCurrentStep(0)
  }

  const handleArrowLeft = () => {
    void navigate(-1)
  }

  //soumission des informations
  const handleSubmit = (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    console.log(event)
    setNewIdFromApi(1) //ID qui sera recu apres creation d'une oeuvre
    console.log('formData: ', formData)
  }

  const handleInputChange = (
    name: string,
    value: string | boolean //Ajout du type boolean pour les cases à cocher
  ) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
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
    formUpload.append('destination', 'Place') // ou journey, step, etc.

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

  useEffect(() => {
    setStep(getInput.length)
    setMessage({
      info: '',
      result: false,
    })
  }, [getInput])

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
    setStep(getInput.length)
    setCurrentStep(0)
  }, [getInput])

  return (
    <>
      <Form
        title={title}
        icon={<PlaceIcon />}
        client={client}
        // place={place}
        isAssociated={formData.stepId == 0}
        handleSelectClient={handleSelectClient}
        handleSelectPlace={handleSelectPlace}
        selectedClientId={selectedClientId}
        selectedPlaceId={selectedPlaceId}
        selectedJourneyId={selectedJourneyId}
        newIdFromApi={newIdFromApi}
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
        handleFileUpload={void handleFileUpload}
        handleDescription={handleDescription}
        handleSelectJourney={handleSelectJourney}
      />
    </>
  )
}

export { FormPiece }
