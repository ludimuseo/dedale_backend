import { addDoc, collection } from 'firebase/firestore'
import { type FC, FormEvent, MouseEvent, useEffect, useState } from 'react'

import successImage from '@/assets/imgs/minos-reussi.png'
import { db } from '@/firebase/firebase'
import { ClientType } from '@/types'

import { getInputClientConfig } from './configClient/getInputClientConfig'

export interface MessageType {
  info: string
  result: boolean
}

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

  console.log('data:', client)

  return (
    <>
      {/*CONTAINER */}
      <div className="grid grid-cols-1 gap-1 p-10 sm:grid-cols-1">
        {/*NAVIGATION AREA */}
        <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
          <div className="mx-5 mb-4 mt-4 flex flex-row">
            <button className="flex justify-center rounded bg-rose-400 p-3 font-bold text-white hover:bg-opacity-100">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="ml-4 mt-2">Formulaire Client</h1>
            <svg width="100" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="5" cy="8" r="5" fill="#0A184D" />
              <ellipse cx="5" cy="19" rx="8" ry="5" fill="#0A184D" />
            </svg>
          </div>
        </div>

        {/*TIMELINE AREA */}
        <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white p-5">
          <h1>{getInput[currentStep][step]?.sectionLabel}</h1>
          {/* <h1>
            {currentStep + 1}/{step}
          </h1> */}
          <div className="flex flex-row">
            {getInput.map((inputs, index) => {
              if (currentStep + 1 > index + 1 || message.info) {
                return (
                  <div>
                    <svg height="100" width="200" key={index}>
                      <circle
                        cx="50"
                        cy="50"
                        r="25"
                        stroke="#4AD87E"
                        strokeWidth="1"
                        fill="#4AD87E"
                      />
                      <path
                        d="M35 50 L45 60 L65 40"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {
                        //ligne
                        currentStep !== index && (
                          <svg height="100" width="200">
                            <line
                              x1="75"
                              y1="50"
                              x2="240"
                              y2="50"
                              stroke="grey"
                              strokeWidth="1"
                            />
                          </svg>
                        )
                      }
                    </svg>
                    <div className="mr-12 text-center">
                      <span>{inputs[index].sectionLabel}</span>
                      <br />
                      <span className="font-bold text-emerald-500">
                        Complet
                      </span>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className="mr-5">
                    <svg height="100" width="100" key={index}>
                      <circle
                        cx="50"
                        cy="50"
                        r="25"
                        stroke="#707785"
                        strokeWidth="1"
                        fill={
                          currentStep + 1 === index + 1 ? '#0A184D' : 'white'
                        }
                      />
                      <text
                        x="50"
                        y="52"
                        fontSize="30"
                        fontWeight={
                          currentStep + 1 > index + 1 ? 'bold' : 'light'
                        }
                        fill={
                          currentStep + 1 === index + 1 ? 'white' : '#707785'
                        }
                        textAnchor="middle"
                        dominantBaseline="middle">
                        {index + 1}
                      </text>
                    </svg>

                    <div className="text-center">
                      {currentStep + 1 === index + 1 ? (
                        <div>
                          <span>{getInput[index][step]?.sectionLabel}</span>
                          <br />
                          <span className="font-bold text-rose-500">
                            En cours
                          </span>
                        </div>
                      ) : (
                        <>
                          <span className="text-gray-400">
                            {getInput[index][step]?.sectionLabel}
                          </span>
                          <br />
                          <span className="text-gray-400">En attente</span>
                        </>
                      )}
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>

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

        {/*STEP AREA */}
        <div className="dark:border-strokedark dark:bg-boxdark flex flex-col rounded-sm border bg-white px-20">
          <div className="flex flex-row justify-center">
            {message.result ? (
              <>
                <button
                  className="mx-8 mb-8 mt-8 flex justify-center rounded bg-blue-900 p-3 font-bold text-white hover:bg-opacity-100"
                  onClick={handleEditPlace}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M2 10h20M12 2l10 8H2l10-8z" />
                    <path d="M5 10v10M9 10v10M15 10v10M19 10v10M2 20h20" />
                  </svg>
                  <span className="ml-4 mt-0.5">{`Editer un Lieu `}</span>
                </button>
              </>
            ) : currentStep < step - 1 ? (
              <>
                {currentStep > 0 && (
                  <>
                    <button
                      className="mx-8 mb-8 mt-8 flex justify-center rounded bg-blue-900 p-3 font-bold text-white hover:bg-opacity-100"
                      onClick={handlePrevStep}>
                      {`<- Précédent`}
                    </button>
                    <br />
                  </>
                )}
                <button
                  className="mx-8 mb-8 mt-8 flex justify-center rounded bg-blue-900 p-3 font-bold text-white hover:bg-opacity-100"
                  onClick={handleNextStep}>
                  {`Suivant ->`}
                </button>
              </>
            ) : (
              <>
                <button
                  className="mx-8 mb-8 mt-8 flex justify-center rounded bg-blue-900 p-3 font-bold text-white hover:bg-opacity-100"
                  onClick={handlePrevStep}>
                  {`<- Précédent`}
                </button>
                <br />
                <button
                  className="mx-8 mb-8 mt-8 flex justify-center rounded bg-rose-400 p-3 font-bold text-white hover:bg-opacity-100"
                  onClick={(event) => void handleSubmit(event)}>
                  {/*Add void because Promise-returning function provided to attribute where a void return was expected  */}
                  VALIDER
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default FormClient
