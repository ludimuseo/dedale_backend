//import { db } from "@/firebase/firebase"
//import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
//import { addDoc, collection } from "firebase/firestore"
import { FormEvent, MouseEvent, useEffect, useState } from 'react'

import { handleArrowLeft } from '@/app/services/utils'
import { MessageType, T } from '@/types'

import Form from '../form'
import { getInputPlaceConfig } from './configPlace/getInputPlaceConfig'

const FormPlace = () => {
  const [step, setStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [message, setMessage] = useState<MessageType>({
    info: '',
    result: false,
  })
  const [formData, setFormData] = useState<T>({
    address: {
      address: '',
      city: '',
      country: '',
      postal: '',
    },
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
    },
    coords: {
      isLocationRequired: false,
      lat: 0,
      lon: 0,
    },
    description: {
      falc: {
        en: '',
        fr: '',
        isValidate: false,
      },
      standard: {
        en: '',
        fr: '',
      },
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

  const handleEditPlace = () => {
    alert('Edit Place')
  }

  //soumission des informations
  const handleSubmit = (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    try {
      //    const docRef = await addDoc(collection(db, 'places'), { ...formData })
      //    const id = docRef.id
      // if (id) {
      //     setMessage(() => ({
      //         info: 'Votre formulaire a été envoyé avec succès !',
      //         result: true,
      //     }))
      // }
      setMessage(() => ({
        info: 'Votre formulaire a été envoyé avec succès !',
        result: true,
      }))
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [name]: value,
      },
    }))
  }

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

      const modeData = sectionData[mode]
      return {
        ...prevFormData,
        [section]: {
          ...sectionData,
          [mode]: {
            modeData,
            [language]: value,
          },
        },
      }
    })
  }

  const handleFileUpload = (
    file: File,
    fileType: string,
    section: string,
    name: string
  ) => {
    console.log('fileType: ', fileType)
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [name]: file,
      },
    }))
    //const storage = getStorage();
    //const storageRef = ref(storage, `${fileType}/${file.name + (Math.random() + 1)}`);

    // try {
    //     await uploadBytes(storageRef, file);
    //     const downloadURL = await getDownloadURL(storageRef);
    //     console.log("File uploaded successfully. Download URL:", downloadURL);
    //     setFormData((prevState) => ({
    //         ...prevState,
    //         fileUpload: {
    //             ...prevState.fileUpload,
    //             [fileType]: downloadURL,
    //         }
    //     }));
    // } catch (error) {
    //     console.error("Error uploading file:", error);
    //     console.log(error);

    // }
  }

  const getInput = getInputPlaceConfig

  useEffect(() => {
    setStep(getInput.length)
  }, [getInput])

  //useEffect(() => {
  //VERIFIER SI USER.ROLE === 'SUPERADMIN' sinon redirection page dashboard
  //}, [])

  console.log('FormData image:', formData.content)

  return (
    <>
      <Form
        title={'Formulaire Lieu'}
        handleArrowLeft={handleArrowLeft}
        getInput={getInput}
        currentStep={currentStep}
        step={step}
        message={message}
        handleSubmit={(event) => {
          handleSubmit(event)
        }}
        formData={formData}
        handleInputChange={(section, name, value) => {
          handleInputChange(section, name, value)
        }}
        handleChange={(section, mode, langaue, value) => {
          handleChange(section, mode, langaue, value)
        }}
        handleEdit={handleEditPlace}
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handleFileUpload={handleFileUpload}
      />
    </>
  )
}

export default FormPlace
