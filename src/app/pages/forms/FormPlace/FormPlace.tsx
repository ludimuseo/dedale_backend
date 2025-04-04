import { PlaceIcon } from '@component'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { v4 as uuidv4 } from 'uuid'

import { getDescriptionConfig } from '@/app/components/description/getDescriptionConfig'
import { db } from '@/firebase/firebase'
import { MessageType, T } from '@/types'

import Form from '../Form'
import { getInputPlaceConfig } from './configPlace/getInputPlaceConfig'

const FormPlace: FC = () => {
  const navigate = useNavigate()
  const title = 'Formulaire Lieu'
  const [step, setStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [showDescription, setShowDescription] = useState(false)
  const [clientIdAndName, setClientIdAndName] = useState<
    { id: string; name: string }[] | undefined
  >([])

  const [medalsData, setMedalsData] = useState<
    | { id: string; name: string; image: string; description: string }[]
    | undefined
  >([])
  const [selectedOption, setSelectedOption] = useState('')
  const [newPlaceId, setNewPlaceId] = useState<string>('')
  const [attributedMedal, setAttributedMedal] = useState<
    { id: string; name: string; image: string; description: string } | undefined
  >()
  const [message, setMessage] = useState<MessageType>({
    info: '',
    result: false,
  })
  const [formData, setFormData] = useState<T>({
    clientId: '',
    medalId: '',
    // image: '',
    content: {
      image: '',
    },
    address: {
      address: '',
      city: '',
      country: '',
      postal: '',
    },

    coords: {
      isLocationRequired: false,
      lat: 0,
      lon: 0,
    },
    name: {
      en: '',
      fr: '',
    },
    status: {
      isActive: false, //ACTIVER/DESACTIVER LE CLIENT
      isPublished: false,
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

  const handleDescription = () => {
    //AFFICHER Descritpion
    setShowDescription(true)
    setCurrentStep(0)
  }

  const handleArrowLeft = () => {
    void navigate(-1)
  }
  //liste des clients

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
    // console.log('FETCH formData: ', formData)

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc0Mzc1ODc1NiwiZXhwIjoxNzQzODMwNzU2fQ.Iga10Dw5PL2-gkDAoJTDRCqF_Ehn5-I0zW6ezrbwgkc'
    //const place = { ...formData }

    const place = {
      place: {
        clientId: 2,
        name: 'created from backoffice',
        type: 'MUSEUM',
        lat: 0,
        lon: 0,
        location_required: 'false',
        image: 'image.png',
        isPublished: 'false',
        isActive: 'false',
      },
    }

    console.log('place: ', place)

    try {
      const response: Response = await fetch(
        `https://dev.ludimuseo.fr:4000/api/places`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(place),
        }
      )

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${String(response.status)}`)
      }

      const data: unknown = await response.json()
      console.log('DATA from Server', data)
    } catch (error) {
      console.error('Erreur:', error)
      setMessage({
        info: "Erreur lors de l'envoi du formulaire",
        result: true,
      })
    }

    try {
      const docRef = await addDoc(collection(db, 'places'), { ...formData })
      const id = docRef.id
      if (id) {
        setNewPlaceId(id)
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
    console.log('FORMPLACE value isChecked:', value)

    const sectionData = formData[section]
    if (!section) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
    } else if (typeof sectionData === 'object') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [section]: {
          ...sectionData,
          [name]: value,
        },
      }))
    }
  }

  //changement des donnees avec un objet plus profond
  const handleChange = <
    S extends keyof T,
    M extends keyof T[S],
    L extends keyof T[S][M],
  >(
    section: S,
    mode: M,
    language: L,
    value: T[S][M][L]
  ) => {
    setFormData((prevFormData) => {
      const sectionData = prevFormData[section]
      const modeData = sectionData[mode] as T[M]
      if (typeof sectionData === 'object' && typeof modeData === 'object') {
        return {
          ...prevFormData,
          [section]: {
            ...sectionData,
            [mode]: {
              ...modeData,
              [language]: value,
            },
          },
        }
      } else {
        return formData
      }
    })
  }

  const handleFileUpload = async (
    file: File,
    fileType: string,
    name: string
  ) => {
    const storage = getStorage()
    const storageRef = ref(storage, `${fileType}/${uuidv4()}_${file.name}`)

    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: downloadURL,
      }
    })
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setSelectedOption(selectedValue)
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        ['clientId']: selectedValue,
      }
    })
  }

  const handleAttributeMedal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (medalsData) {
      const selectedValue = e.target.value
      const selectedMedal = medalsData.find(
        (medal) => medal.id === selectedValue
      )
      setAttributedMedal(selectedMedal)
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          ['medalId']: selectedValue,
        }
      })
    }
  }

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
      interface ClientData {
        id: string
        client?: {
          company?: {
            name?: string
          }
        }
        company?: {
          name?: string
        }
      }
      try {
        const querySnapshot = await getDocs(collection(db, 'clients'))
        const clientData: ClientData[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ClientData, 'id'>),
        }))

        const clientPackageData = clientData
          .map((item) => {
            if (item.client?.company?.name) {
              return { id: item.id, name: item.client.company.name } // Si "client" et "company.name" existent
            } else if (item.company?.name) {
              return { id: item.id, name: item.company.name } // Si "company.name" existe directement;
            }
            return undefined
          })
          .filter(
            (item): item is { id: string; name: string } => item !== undefined
          ) //Ce filtre assure à TypeScript que le tableau résultant ne contient que des objets conformes au type { id: string, name: string }.

        setClientIdAndName(clientPackageData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    void fetchClients()
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

  //useEffect(() => {
  //VERIFIER SI USER.ROLE === 'SUPERADMIN' sinon redirection page dashboard
  //}, [])
  console.log('newId:', newPlaceId)

  return (
    <>
      <Form
        clientIdAndName={clientIdAndName && clientIdAndName} //no use yet
        handleSelect={handleSelect} //no use yet
        selectedOption={selectedOption}
        medalsData={medalsData}
        attributedMedal={attributedMedal}
        handleAttributeMedal={handleAttributeMedal}
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
        handleInputChange={(section, name, value) => {
          handleInputChange(section, name, value)
        }}
        handleChange={(section, mode, langaue, value) => {
          handleChange(section, mode, langaue, value)
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
