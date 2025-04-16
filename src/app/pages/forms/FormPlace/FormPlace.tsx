import { PlaceIcon } from '@component'
import { useAppSelector } from '@hook'
import { collection, getDocs } from 'firebase/firestore'
import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { fetchWithAuth } from '@/api/fetchWithAuth'
import { getDescriptionConfig } from '@/app/components/description/getDescriptionConfig'
import { useTimelineStep } from '@/app/hooks/useTimelineStep'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { db } from '@/firebase/firebase'
import { ClientType, MessageType, PlaceType, State } from '@/types'

import Form from '../Form'
import { getInputPlaceConfig } from './configPlace/getInputPlaceConfig'

const FormPlace: FC = () => {
  const navigate = useNavigate()
  const title = 'Formulaire Lieu'
  const [showDescription, setShowDescription] = useState(false)
  const [client, setClient] = useState<ClientType[]>([])
  const [medalsData, setMedalsData] = useState<
    | { id: string; name: string; image: string; description: string }[]
    | undefined
  >([])
  const [selectedOption, setSelectedOption] = useState<number>()
  const [newPlaceId, setNewPlaceId] = useState<number>()
  //const [attributedMedal, setAttributedMedal] = useState<
  //  { id: string; name: string; image: string; description: string } | undefined
  // >()
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
      setNewPlaceId(newId) // recupere l'Id du nouveau place créé

      console.log('newId from Server', newId)
    } catch (error) {
      console.error('Erreur:', error)
      setMessage({
        info: "Erreur lors de l'envoi du formulaire",
        result: true,
      })
    }

    /* THROW TO FIREBASE */
    //   try {
    //     const docRef = await addDoc(collection(db, 'places'), { ...formData })
    //     const id = docRef.id
    //     if (id) {
    //       setNewPlaceId(id)
    //       setMessage(() => ({
    //         info: 'Votre formulaire a été envoyé avec succès !',
    //         result: true,
    //       }))
    //     }
    //   } catch (error) {
    //     console.error("Erreur sur l'envoi du formulaire", error)
    //     setMessage(() => ({
    //       info: "Erreur lors de l'envoi du formulaire",
    //       result: false,
    //     }))
    //   }
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

  //changement des donnees avec un objet plus profond
  // const handleChange = <
  //   S extends keyof T,
  //   M extends keyof T[S],
  //   L extends keyof T[S][M],
  // >(
  //   section: S,
  //   mode: M,
  //   language: L,
  //   value: T[S][M][L]
  // ) => {
  //   setFormData((prevFormData) => {
  //     const sectionData = prevFormData[section]
  //     const modeData = sectionData[mode] as T[M]
  //     if (typeof sectionData === 'object' && typeof modeData === 'object') {
  //       return {
  //         ...prevFormData,
  //         [section]: {
  //           ...sectionData,
  //           [mode]: {
  //             ...modeData,
  //             [language]: value,
  //           },
  //         },
  //       }
  //     } else {
  //       return formData
  //     }
  //   })
  // }

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

      /* FROM FIREBASE */
      // try {
      //   const querySnapshot = await getDocs(collection(db, 'clients'))
      //   const clientData: ClientData[] = querySnapshot.docs.map((doc) => ({
      //     id: doc.id,
      //     ...(doc.data() as Omit<ClientData, 'id'>),
      //   }))

      //   const clientPackageData = clientData
      //     .map((item) => {
      //       if (item.client?.company?.name) {
      //         return { id: item.id, name: item.client.company.name } // Si "client" et "company.name" existent
      //       } else if (item.company?.name) {
      //         return { id: item.id, name: item.company.name } // Si "company.name" existe directement;
      //       }
      //       return undefined
      //     })
      //     .filter(
      //       (item): item is { id: string; name: string } => item !== undefined
      //     ) //Ce filtre assure à TypeScript que le tableau résultant ne contient que des objets conformes au type { id: string, name: string }.

      //   setClient(clientPackageData)
      // } catch (error) {
      //   console.error('Error fetching data:', error)
      // }
    }
    void fetchClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    interface Medal {
      id: string

      medal: {
        description: {
          standard: {
            fr: string
          }
        }
        name: {
          fr: string
        }
        image: string
      }
    }
    const fecthMedal = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'medals'))
        const medalData: Medal[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Medal, 'id'>),
        }))
        const medalPackageData = medalData.map((item) => {
          return {
            id: item.id,
            name: item.medal.name.fr,
            image: item.medal.image,
            description: item.medal.description.standard.fr,
          }
        })
        setMedalsData(medalPackageData)
      } catch (error) {
        console.log('Error in fetching medals', error)
      }
    }
    void fecthMedal()
  }, [])

  useEffect(() => {
    if (!token) void navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('formData:', formData)

  return (
    <>
      <Form
        client={client}
        isClientId={formData.clientId !== 0}
        handleSelectClient={handleSelectClient}
        selectedOption={selectedOption}
        medalsData={medalsData}
        //attributedMedal={attributedMedal}
        //handleAttributeMedal={handleAttributeMedal}
        newPlaceId={newPlaceId}
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
