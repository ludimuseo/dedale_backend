import { PlaceIcon } from '@component'
import { useAppSelector } from '@hook'
import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { fetchWithAuth } from '@/api/fetchWithAuth'
import { getDescriptionConfig } from '@/app/components/description/getDescriptionConfig'
import { useTimelineStep } from '@/app/hooks/useTimelineStep'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { ClientType, MessageType, PlaceType, State } from '@/types'

import Form from '../Form'
import { getInputPlaceConfig } from './configPlace/getInputPlaceConfig'

const FormPlace: FC = () => {
  const navigate = useNavigate()
  const title = 'Formulaire Lieu'
  const [showDescription, setShowDescription] = useState(false)
  const [client, setClient] = useState<ClientType[]>([])
  const [selectedOption, setSelectedOption] = useState<number>()
  const [newIdFromApi, setNewIdFromApi] = useState<number>()
  const [message, setMessage] = useState<MessageType>({
    info: '',
    result: false,
  })
  const [formData, setFormData] = useState<PlaceType>({
    clientId: 0,
    medalId: 0,
    image: 'image.png',
    type: 'MUSEUM',
    address: '',
    city: '',
    country: '',
    postal: '',
    location_required: false,
    lat: 0,
    lon: 0,
    name: '',
    isActive: false,
    isPublished: false,
  })
  const { token }: StateAuth = useAppSelector((state: State) => state.auth)
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
  const handleSubmit = async (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

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

    if (!token) {
      alert("Une erreur c'est produite, reconnectez-vous")
      void navigate('/auth/signin')
      return
    }

    try {
      const response: Response = await fetch(
        `https://dev.ludimuseo.fr:4000/api/places`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ place: formData }),
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

  const handleInputChange = (
    name: string,
    value: string | boolean // Ajout du type boolean pour les cases à cocher
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
    setSelectedOption(selectedValueToNumber)
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        ['clientId']: selectedValueToNumber,
      }
    })
  }

  // const handleAttributeMedal = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   if (medalsData) {
  //     const selectedValue = e.target.value
  //     const selectedMedal = medalsData.find(
  //       (medal) => medal.id === selectedValue
  //     )
  //     setAttributedMedal(selectedMedal)
  //     setFormData((prevFormData) => {
  //       return {
  //         ...prevFormData,
  //         ['medalId']: selectedValue,
  //       }
  //     })
  //   }
  // }

  const getInput = !showDescription ? getInputPlaceConfig : getDescriptionConfig

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

  console.log('formData:', formData)

  return (
    <>
      <Form
        client={client}
        isAssociated={formData.clientId !== 0}
        handleSelectClient={handleSelectClient}
        selectedOption={selectedOption}
        //attributedMedal={attributedMedal}
        //handleAttributeMedal={handleAttributeMedal}
        newIdFromApi={newIdFromApi}
        title={title}
        icon={<PlaceIcon />}
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
        handleFileUpload={void handleFileUpload}
      />
    </>
  )
}

export { FormPlace }
