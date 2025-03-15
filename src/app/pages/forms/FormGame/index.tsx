import { addDoc, collection, getDocs } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { PlaceIcon } from '@/app/components'
import { handleArrowLeft } from '@/app/services/utils'
import { db } from '@/firebase/firebase'
import { MessageType, T } from '@/types'

import Form from '../Form'
import { getInputGameConfig } from './configGame/getInputTextGameConfig'

const FormGame: FC = () => {
  const title = 'Formulaire Jeu'
  const [step, setStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [clientIdAndName, setClientIdAndName] = useState<
    { id: string; name: string }[] | undefined
  >([])
  const [medalsData, setMedalsData] = useState<
    | { id: string; name: string; image: string; description: string }[]
    | undefined
  >([])
  const [selectedOption, setSelectedOption] = useState('')
  const [attributedMedal, setAttributedMedal] = useState<
    { id: string; name: string; image: string; description: string } | undefined
  >()
  const [message, setMessage] = useState<MessageType>({
    info: '',
    result: false,
  })
  const [formData, setFormData] = useState<T>({
    pieceId: '',
    audio: {
      falc: {
        en: '',
        fr: '',
      },
      standard: {
        en: '',
        fr: '',
      },
    },
    content: {
      image: [],
      type: '',
      level: '',
    },
    question: {
      falc: {
        en: '',
        fr: '',
        falcCertified: '',
        userId: '',
        status: {
          isValidate: false,
          isCertified: false,
          certifiedDate: null,
          isCorrected: false,
        },
      },
      standard: {
        en: '',
        fr: '',
      },
    },
    response: {
      responseTrue: {
        standard: {
          fr: '',
          en: '',
        },
        falc: {
          fr: '',
          en: '',
          falcCertified: '',
        },
      },
      response1: {
        standard: {
          fr: '',
          en: '',
        },
        falc: {
          fr: '',
          en: '',
          falcCertified: '',
        },
      },
      response2: {
        standard: {
          fr: '',
          en: '',
        },
        falc: {
          fr: '',
          en: '',
          falcCertified: '',
        },
      },
    },
    explanation: {
      responseTrue: {
        standard: {
          fr: '',
          en: '',
        },
        falc: {
          fr: '',
          en: '',
          falcCertified: '',
        },
      },
      response1: {
        standard: {
          fr: '',
          en: '',
        },
        falc: {
          fr: '',
          en: '',
          falcCertified: '',
        },
      },
      response2: {
        standard: {
          fr: '',
          en: '',
        },
        falc: {
          fr: '',
          en: '',
          falcCertified: '',
        },
      },
    },
    name: {
      en: '',
      fr: '',
    },
    status: {
      isActive: false, //ACTIVER/DESACTIVER
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

  const handleEditPlace = () => {
    alert('Edit Place')
  }

  //liste des clients

  //soumission des informations
  const handleSubmit = async (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    try {
      const docRef = await addDoc(collection(db, 'places'), { ...formData })
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

  const handleInputChange = <S extends keyof T, K extends keyof T[S]>(
    section: S,
    name: K,
    value: T[S][K]
  ) => {
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

  //changement des donnees avec une profondeur en plus
  const handleResponseChange = <
    S extends keyof T,
    M extends keyof T[S],
    L extends keyof T[S][M],
    F extends keyof T[S][M][L],
  >(
    section: S,
    name: M,
    mode: L,
    language: F,
    value: T[S][M][L][F]
  ) => {
    setFormData((prevFormData) => {
      const sectionData = prevFormData[section]
      const nameData = sectionData[name] as T[M]
      const modeData = sectionData[name][mode] as T

      if (typeof sectionData === 'object' && typeof nameData === 'object') {
        return {
          ...prevFormData,
          [section]: {
            ...sectionData,
            [name]: {
              ...nameData,
              [mode]: {
                ...modeData,
                [language]: value,
              },
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
    section: string,
    name: string
  ) => {
    const storage = getStorage()
    const storageRef = ref(storage, `${fileType}/${uuidv4()}_${file.name}`)

    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)

    setFormData((prevFormData) => {
      const sectionData = prevFormData[section]
      if (typeof sectionData === 'object') {
        return {
          ...prevFormData,
          [section]: {
            ...sectionData,
            [name]: downloadURL,
          },
        }
      } else {
        return formData
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

  const getInput = getInputGameConfig

  useEffect(() => {
    setStep(getInput.length)
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

  console.log('FormData:', { ...formData })

  // const updateNestedData = <S extends keyof T>(
  //   section: S,
  //   path: string[], // ['audio', 'standard', 'en']
  //   value: string
  // ) => {
  //   setFormData((prev) => {
  //     const updatedData = { ...prev }
  //     let current = updatedData[section]
  //     for (let i = 0;i < path.length - 1;i++) {
  //       current = current[path[i]]
  //     }
  //     current[path[path.length - 1]] = value
  //     return updatedData
  //   })
  // }

  return (
    <>
      <Form
        clientIdAndName={clientIdAndName && clientIdAndName}
        handleSelect={handleSelect}
        selectedOption={selectedOption}
        medalsData={medalsData}
        attributedMedal={attributedMedal}
        handleAttributeMedal={handleAttributeMedal}
        title={title}
        icon={<PlaceIcon />}
        handleArrowLeft={handleArrowLeft}
        getInput={getInput}
        currentStep={currentStep}
        step={step}
        message={message}
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
        handleResponseChange={(section, name, mode, language, value) => {
          handleResponseChange(section, name, mode, language, value)
        }}
        handleEdit={handleEditPlace}
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handleFileUpload={void handleFileUpload}
      />
    </>
  )
}

export { FormGame }
