/* eslint-disable react-hooks/exhaustive-deps */
import { JourneyIcon } from '@component'
import { useAppSelector } from '@hook'
import { FC, FormEvent, MouseEvent, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import { fetchWithAuth } from '@/api/fetchWithAuth'
import { getDescriptionConfig } from '@/app/components/description/getDescriptionConfig'
import { useClients } from '@/app/hooks/useClients'
import { useDescriptions } from '@/app/hooks/useDescriptions'
import { useFileUpload } from '@/app/hooks/useFileUpload'
import { useFormMessage } from '@/app/hooks/useFormMessage'
import { useInputChange } from '@/app/hooks/useInputChange'
import { useMedals } from '@/app/hooks/useMedals'
import { usePlaces } from '@/app/hooks/usePlaces'
import { useSelectHandlers } from '@/app/hooks/useSelect'
import { useSelectedId } from '@/app/hooks/useSelectedId'
import { useTimelineStep } from '@/app/hooks/useTimelineStep'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { API_BASE_URL } from '@/config/config'
import { FormDataType, State } from '@/types'

import Form from '../Form'
import { getInputJourneyConfig } from './configJourney/getInputJourneyConfig'

const FormJourney: FC = () => {
  const title = 'Formulaire Parcours'
  const collection = 'journeys'
  const [newIdFromApi, setNewIdFromApi] = useState<number>(0)
  const navigate = useNavigate()
  const { message, setMessage } = useFormMessage()
  const { selected, setSelected } = useSelectedId()
  const { token }: StateAuth = useAppSelector((state: State) => state.auth)
  const { data: clients } = useClients(token)
  const { data: medals } = useMedals(token)
  const { data: places, refetch } = usePlaces(selected.selectedClientId, token)
  const initialJourneyData: FormDataType = {
    id: 0,
    placeId: 0,
    medalId: 0,
    duration: 0,
    name: '',
    address: '',
    city: '',
    country: '',
    postal: '',
    image: '',
    type: 'MUSEUM',
    location_required: false,
    lat: 0,
    lon: 0,
    isActive: false,
    isPublished: false,
  }
  const { formData, setFormData, handleInputChange } =
    useInputChange(initialJourneyData)

  const {
    step,
    setStep,
    currentStep,
    setCurrentStep,
    handleNextStep,
    handlePrevStep,
  } = useTimelineStep()

  const { handleSelectClient, handleSelectMedal, handleSelectPlace } =
    useSelectHandlers(setFormData, formData, setSelected)

  const { handleDescription, showDescription, handleSubmitDescriptions } =
    useDescriptions(newIdFromApi, collection, token, setCurrentStep, setMessage)

  const { handleFileUpload } = useFileUpload(token, setFormData)
  const getInput = useMemo(() => {
    return showDescription ? getDescriptionConfig : getInputJourneyConfig
  }, [showDescription])

  const handleArrowLeft = () => {
    void navigate(-1)
  }
  useEffect(() => {
    if (selected.selectedClientId) {
      void refetch()
    }
  }, [selected.selectedClientId])

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

    //FETCH des donnees a l'API et recuperer l'ID
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
        `${API_BASE_URL}/journeys/create`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ journey: formData }),
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
        result: false,
      })
    }
  }

  useEffect(() => {
    setStep(getInput.length)
    setMessage({
      info: '',
      result: false,
    })
  }, [getInput])

  console.log('FORMJOURNEY formData', formData)
  console.log(
    'FORMJOURNEY selected.selectedClientId',
    selected.selectedClientId
  )

  return (
    <>
      <Form
        client={clients}
        place={places}
        medal={medals}
        isAssociated={formData.placeId !== 0}
        handleSelectClient={handleSelectClient}
        handleSelectPlace={handleSelectPlace}
        handleSelectMedal={handleSelectMedal}
        selectedClientId={selected.selectedClientId}
        selectedPlaceId={selected.selectedPlaceId}
        newIdFromApi={newIdFromApi}
        title={title}
        collection={collection}
        icon={<JourneyIcon />}
        handleArrowLeft={handleArrowLeft}
        getInput={getInput}
        currentStep={currentStep}
        step={step}
        message={message}
        showDescription={showDescription}
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
        handleSubmitDescriptions={(descriptions) => {
          void handleSubmitDescriptions(descriptions)
        }}
      />
    </>
  )
}

export { FormJourney }
