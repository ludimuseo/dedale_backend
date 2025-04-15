import { JourneyIcon } from '@component'
import { collection, getDocs } from 'firebase/firestore'
import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react'

import { useTimelineStep } from '@/app/hooks/useTimelineStep'
import { handleArrowLeft } from '@/app/services/utils'
import { db } from '@/firebase/firebase'
import { JourneyType } from '@/types'

import Form from '../Form'
import { getInputJourneyConfig } from './configJourney/getInputJourneyConfig'

const FormJourney: FC = () => {
  const title = 'Formulaire Parcours'
  // const [placeIdAndName, setPlaceIdAndName] = useState<
  //     { docId: string; name: string }[] | undefined
  // >([])
  const [medalsData, setMedalsData] = useState<
    | { id: string; name: string; image: string; description: string }[]
    | undefined
  >([])
  //const [selectedOption, setSelectedOption] = useState('')
  const [selectedPlaceOption, setSelectedPlaceOption] = useState('')
  //const [attributedMedal, setAttributedMedal] = useState<
  //    { id: string; name: string; image: string; description: string } | undefined
  //>()
  //const [message, setMessage] = useState<MessageType>({
  //    info: '',
  //    result: false,
  //})
  const [formData, setFormData] = useState<JourneyType>({
    placeId: 0,
    medalId: 0,
    duration: 0,
    name: '',
    address: '',
    city: '',
    country: '',
    postal: '',
    image: '',
    type: '',
    location_required: false,
    lat: 0,
    lon: 0,
    isActive: false,
    isPublished: false,
  })

  const { step, setStep, currentStep, handleNextStep, handlePrevStep } =
    useTimelineStep()

  //soumission des informations
  const handleSubmit = (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    // try {
    //     const docRef = await addDoc(collection(db, 'journeys'), { ...formData })
    //     const dataId = docRef.id
    //     if (dataId) {
    //         setMessage(() => ({
    //             info: 'Votre formulaire a été envoyé avec succès !',
    //             result: true,
    //         }))
    //     }
    // } catch (error) {
    //     console.error("Erreur sur l'envoi du formulaire", error)
    //     setMessage(() => ({
    //         info: "Erreur lors de l'envoi du formulaire",
    //         result: false,
    //     }))
    // }
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  //   const handleFileUpload = async (
  //     file: File,
  //     fileType: string,
  //     section: string,
  //     name: string
  //   ) => {
  //     const storage = getStorage()
  //     const storageRef = ref(storage, `${fileType}/${uuidv4()}_${file.name}`)

  //     await uploadBytes(storageRef, file)
  //     const downloadURL = await getDownloadURL(storageRef)

  //     setFormData((prevFormData) => {
  //       const sectionData = prevFormData[section]
  //       if (typeof sectionData === 'object') {
  //         return {
  //           ...prevFormData,
  //           [section]: {
  //             ...sectionData,
  //             [name]: downloadURL,
  //           },
  //         }
  //       } else {
  //         return formData
  //       }
  //     })
  //   }

  //fetchPlaces
  //   const fetchPlaces = async (clientId: string) => {
  //     try {
  //       const q = query(
  //         collection(db, 'places'),
  //         where('place.clientID', '==', clientId)
  //       )
  //       const querySnapshot = await getDocs(q)
  //       const placeData = querySnapshot.docs.map((doc) => ({
  //         docId: doc.id,
  //         ...(doc.data().place as PlaceType),
  //       }))

  //       const packagePlaceData = placeData.map((item) => {
  //         return { docId: item.id, name: item.name.fr }
  //       })
  //       setPlaceIdAndName(packagePlaceData)
  //     } catch (error) {
  //       console.error('Error fetching places:', error)
  //     }
  //   }

  //const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  // const selectedValue = e.target.value
  // setSelectedOption(selectedValue)
  // void fetchPlaces(selectedValue)
  //}

  const handlePlaceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setSelectedPlaceOption(selectedValue)
    // void fetchPlaces(selectedValue)

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        ['placeId']: Number(selectedValue),
      }
    })
  }

  // const handleAttributeMedal = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     if (medalsData) {
  //         const selectedValue = e.target.value
  //         const selectedMedal = medalsData.find(
  //             (medal) => medal.id === selectedValue
  //         )
  //         setAttributedMedal(selectedMedal)
  //         setFormData((prevFormData) => {
  //             return {
  //                 ...prevFormData,
  //                 ['medalId']: Number(selectedValue),
  //             }
  //         })
  //     }
  // }

  const getInput = getInputJourneyConfig

  useEffect(() => {
    setStep(getInput.length)
  }, [getInput])

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
          //         }
          image: string
        }
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
            image: 'item.medal.image',
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
  //   //VERIFIER SI USER.ROLE === 'SUPERADMIN' sinon redirection page dashboard/   //}, [])

  //console.log('FormDataJourney:', { ...formData })

  return (
    <>
      <Form
        handlePlaceSelect={handlePlaceSelect}
        // selectedOption={selectedOption}
        selectedPlaceOption={selectedPlaceOption}
        medalsData={medalsData}
        // attributedMedal={attributedMedal}
        // handleAttributeMedal={handleAttributeMedal}
        title={title}
        icon={<JourneyIcon />}
        handleArrowLeft={handleArrowLeft}
        getInput={getInput}
        currentStep={currentStep}
        step={step}
        //message={message}
        handleSubmit={(event) => {
          handleSubmit(event)
        }}
        formData={formData}
        handleInputChange={(name, value) => {
          handleInputChange(name, value)
        }}
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        //handleFileUpload={void handleFileUpload}
      />
    </>
  )
}

export { FormJourney }
