import { UserIcon } from '@component'
import { useAppSelector } from '@hook'
import { FC, type FormEvent, MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { useAuthCheck } from '@/app/hooks/useAuthCheck'
import { useTimelineStep } from '@/app/hooks/useTimelineStep'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { ClientType, ClientTypeApi, MessageType, State } from '@/types'

import Form from '../Form'
import { getInputClientConfig } from './configClient/getInputClientConfig'

const FormClient: FC = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState<MessageType>({
    info: '',
    result: false,
  })
  const [formData, setFormData] = useState<ClientType>({
    id: 0,
    name: '',
    siret: '',
    tva: '',
    type: 'ENTREPRISE', //par default
    website: '',
    address: '',
    postal: '',
    city: '',
    country: '',
    contact: '',
    email: '',
    tel: '',
    note: '',
    isActive: false,
  })
  const { token }: StateAuth = useAppSelector((state: State) => state.auth)
  const { checkToken } = useAuthCheck()

  const { step, setStep, currentStep, handleNextStep, handlePrevStep } =
    useTimelineStep()

  const handleArrowLeft = () => {
    void navigate(-1)
  }

  useEffect(() => {
    if (checkToken(token)) {
      console.log('Token valide')
    } else {
      console.log('Token invalide')
    }
  }, [])

  //soumission des informations FIREBASE
  const handleSubmit = async (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (!token) {
      alert("Une erreur c'est produite")
      void navigate('/')
      return
    }

    //structure des données pour l'api
    const newClient: ClientTypeApi = {
      address: {
        address: formData.address,
        city: formData.city,
        country: formData.country,
        postal: formData.postal,
      },
      company: {
        name: formData.name,
        siret: formData.siret,
        tva: formData.tva,
        type: formData.type,
        website: formData.website,
      },
      contact: {
        email: formData.email,
        name: formData.contact,
        note: 'formData.note',
        tel: formData.tel,
      },
      status: {
        isActive: true,
      },
    }

    try {
      console.log('newClient: ', newClient)
      const response: Response = await fetch(
        `https://dev.ludimuseo.fr:4000/api/clients/create`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newClient),
        }
      )

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${String(response.status)}`)
      }
      setMessage(() => ({
        info: 'Votre formulaire a été envoyé avec succès !',
        result: true,
      }))
    } catch (error) {
      console.error('Erreur:', error)
      setMessage({
        info: "Erreur lors de l'envoi du formulaire",
        result: false,
      })
    }
    // try {
    //   const docRef = await addDoc(collection(db, 'clients'), { ...formData })
    //   const id = docRef.id
    //   if (id) {
    //     setMessage(() => ({
    //       info: 'Votre formulaire a été envoyé avec succès !',
    //       result: true,
    //     }))
    //   }
    // } catch (error) {
    //   console.error("Erreur sur l'envoi du formulaire", error)
    //   setMessage(() => ({
    //     info: "Erreur lors de l'envoi du formulaire",
    //     result: false,
    //   }))
    // }
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

  const getInput = getInputClientConfig

  useEffect(() => {
    setStep(getInput.length)
  }, [getInput])

  useEffect(() => {
    if (!token) void navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('formData:', formData)

  return (
    <>
      <Form
        title={'Formulaire Client'}
        icon={<UserIcon />}
        handleArrowLeft={handleArrowLeft}
        getInput={getInput}
        currentStep={currentStep}
        step={step}
        message={message}
        handleSubmit={(event) => void handleSubmit(event)}
        formData={formData}
        handleInputChange={(name, value) => {
          handleInputChange(name, value)
        }}
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
      />
    </>
  )
}

export { FormClient }
