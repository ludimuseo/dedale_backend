import { addDoc, collection } from 'firebase/firestore'
import { type FC, FormEvent, MouseEvent, useEffect, useState } from 'react'

import ArrowLeftIcon from '@/app/icons/ArrowLeftIcon'
import { MuseumIcon } from '@/app/icons/MuseumIcon'
import { UserIcon } from '@/app/icons/UserIcon'
import successImage from '@/assets/imgs/minos-reussi.png'
import { db } from '@/firebase/firebase'
import { ClientType, MessageType } from '@/types'

import FormFooter from '../formFooter'
import Timeline from '../timeline'
import { getInputClientConfig } from './configClient/getInputClientConfig'

const FormClient: FC = () => {
  const [step, setStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [message, setMessage] = useState<MessageType>({
    info: '',
    result: false,
  })
  const [client, setClient] = useState<ClientType>({
    address: {
      address: '',
      city: '',
      country: '',
      postal: '',
    },
    company: {
      name: '',
      siret: '',
      tva: '',
      type: '',
      website: '',
    },
    contact: {
      email: '',
      name: '',
      note: '',
      tel: '',
    },
    status: {
      isActive: true, //ACTIVER/DESACTIVER LE CLIENT
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
  const handleSubmit = async (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    try {
      const docRef = await addDoc(collection(db, 'clients'), { client })
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

  const handleInputChange = <
    S extends keyof ClientType,
    K extends keyof ClientType[S],
  >(
    section: S,
    name: K,
    value: ClientType[S][K]
  ) => {
    setClient((prevClient) => ({
      ...prevClient,
      [section]: {
        ...prevClient[section],
        [name]: value,
      },
    }))
  }

  const getInput = getInputClientConfig

  useEffect(() => {
    setStep(getInput.length)
  }, [getInput])

  return (
    <>
      {/*CONTAINER */}
      <div className="grid grid-cols-1 gap-1 p-10 sm:grid-cols-1">
        {/*NAVIGATION AREA */}
        <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
          <div className="mx-5 mb-4 mt-4 flex flex-row">
            <button className="flex justify-center rounded bg-rose-400 p-3 font-bold text-white hover:bg-opacity-100">
              <ArrowLeftIcon className="5" />
            </button>
            <h1 className="ml-4 mt-2">Formulaire Client</h1>
            <UserIcon />
          </div>
        </div>
        {/*TIMELINE AREA */}
        <Timeline
          getInput={getInput}
          currentStep={currentStep}
          step={step}
          message={message}
        />
        {/*INPUT AREA CONTAINER*/}
        <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark dark:border-strokedark dark:bg-boxdark flex flex-row justify-center rounded-sm border bg-white p-5">
          {/*INPUT AREA 1*/}
          {!message.info ? (
            <form
              onSubmit={() => handleSubmit}
              className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark mt-5 flex w-1/2 flex-col rounded-sm p-2">
              {/* <span>-- INPUT AREA 1 --</span> */}
              {getInput[currentStep].map(
                ({
                  id,
                  section,
                  rows,
                  type,
                  name,
                  label,
                  option,
                  placeholder,
                }) => {
                  {
                    /*TEXTAREA*/
                  }
                  if (rows) {
                    return (
                      <div className="mt-5 flex flex-col">
                        <span>{label}</span>
                        <textarea
                          key={id}
                          id={id}
                          name={name}
                          className="border-stroke disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-4/6 rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-blue-800 active:border-blue-400 disabled:cursor-default dark:text-white"
                          placeholder={placeholder}
                          rows={rows}
                          value={
                            client[section as keyof ClientType][
                              name as keyof ClientType[keyof ClientType]
                            ]
                          }
                          onChange={(e) => {
                            handleInputChange(
                              section as keyof ClientType,
                              name as keyof ClientType[keyof ClientType],
                              e.target
                                .value as ClientType[keyof ClientType][keyof ClientType[keyof ClientType]]
                            )
                          }}
                        />
                      </div>
                    )
                  } else if (option) {
                    return (
                      <div className="mt-5 flex flex-col">
                        <span>{label}</span>
                        <select
                          name={name}
                          id={id}
                          value={
                            client[section as keyof ClientType][
                              name as keyof ClientType[keyof ClientType]
                            ]
                          }
                          onChange={(e) => {
                            handleInputChange(
                              section as keyof ClientType,
                              name as keyof ClientType[keyof ClientType],
                              e.target
                                .value as ClientType[keyof ClientType][keyof ClientType[keyof ClientType]]
                            )
                          }}
                          className="border-stroke disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-4/6 rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-blue-800 active:border-blue-400 disabled:cursor-default dark:text-white">
                          {option.map((opt, index) => (
                            <option key={index} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    )
                  } else {
                    {
                      /*INPUT*/
                    }
                    return (
                      <div className="mt-5 flex flex-col">
                        <span>{label}</span>
                        <input
                          key={id}
                          id={id}
                          name={name}
                          className="border-stroke disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-4/6 rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-blue-800 active:border-blue-400 disabled:cursor-default dark:text-white"
                          placeholder={placeholder}
                          type={type}
                          value={
                            client[section as keyof ClientType][
                              name as keyof ClientType[keyof ClientType]
                            ]
                          }
                          onChange={(e) => {
                            handleInputChange(
                              section as keyof ClientType,
                              name as keyof ClientType[keyof ClientType],
                              e.target
                                .value as ClientType[keyof ClientType][keyof ClientType[keyof ClientType]]
                            )
                          }}
                        />
                      </div>
                    )
                  }
                }
              )}
            </form>
          ) : (
            <>
              <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark mt-5 flex w-1/2 flex-col items-center rounded-sm p-2">
                <h1> 🚀 {message.info}</h1>
                <img
                  width="30%"
                  src={successImage}
                  alt="Success Minos"
                  className="mt-10"
                />
              </div>
            </>
          )}
          {
            //translate eonz s'affiche si il y a une traduction a executer
            getInput[currentStep].map(({ translate }, index) => {
              if (translate) {
                return (
                  <div
                    key={index}
                    className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark mt-5 w-1/2 rounded-sm border bg-sky-100 p-2">
                    <span>-- TRANSLATION ZONE --</span>
                  </div>
                )
              }
            })
          }
        </div>
        {/*FORMFOOTER */}
        <FormFooter
          message={message}
          handleEdit={handleEditPlace}
          currentStep={currentStep}
          step={step}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleSubmit={(event) => void handleSubmit(event)}
          icon={<MuseumIcon />}
        />
      </div>
    </>
  )
}

export default FormClient
