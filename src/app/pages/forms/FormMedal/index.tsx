// import { addDoc, collection, getDocs } from 'firebase/firestore'
// import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
// import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react'
// import { v4 as uuidv4 } from 'uuid'

// import { PlaceIcon } from '@/app/components'
// import { handleArrowLeft } from '@/app/services/utils'
// import { db } from '@/firebase/firebase'
// import { MessageType, T } from '@/types'

// import Form from '../Form'
// import { getInputMedalConfig } from './configMedal/getInputMedalConfig'

// const FormMedal: FC = () => {
//   const title = 'Formulaire Médaille'
//   const [step, setStep] = useState(0)
//   const [currentStep, setCurrentStep] = useState(0)
//   const [clientIdAndName, setClientIdAndName] = useState<
//     { id: string; name: string }[] | undefined
//   >([])
//   const [selectedOption, setSelectedOption] = useState('')
//   const [message, setMessage] = useState<MessageType>({
//     info: '',
//     result: false,
//   })
//   const [formData, setFormData] = useState<T>({
//     name: {
//       en: '',
//       fr: '',
//     },
//     audio: {
//       falc: {
//         en: '',
//         fr: '',
//       },
//       standard: {
//         en: '',
//         fr: '',
//       },
//     },
//     content: {
//       image: [],
//     },
//     description: {
//       standard: {
//         en: '',
//         fr: '',
//       },
//       falc: {
//         en: '',
//         fr: '',
//         falcCertified: '',
//         userId: '',
//         status: {
//           isValidate: false,
//           isCertified: false,
//           certifiedDate: null,
//           isCorrected: false,
//         },
//       },
//     },
//   })

//   const handleNextStep = () => {
//     if (currentStep === step - 1) return
//     setCurrentStep(currentStep + 1)
//   }

//   const handlePrevStep = () => {
//     if (currentStep === 0) return
//     setCurrentStep(currentStep - 1)
//   }

//   const handleEditPlace = () => {
//     alert('Edit Place')
//   }

//   //liste des clients

//   //soumission des informations
//   const handleSubmit = async (
//     event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault()
//     try {
//       const docRef = await addDoc(collection(db, 'places'), { ...formData })
//       const id = docRef.id
//       if (id) {
//         setMessage(() => ({
//           info: 'Votre formulaire a été envoyé avec succès !',
//           result: true,
//         }))
//       }
//     } catch (error) {
//       console.error("Erreur sur l'envoi du formulaire", error)
//       setMessage(() => ({
//         info: "Erreur lors de l'envoi du formulaire",
//         result: false,
//       }))
//     }
//   }

//   const handleInputChange = <S extends keyof T, K extends keyof T[S]>(
//     section: S,
//     name: K,
//     value: T[S][K]
//   ) => {
//     const sectionData = formData[section]
//     if (!section) {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value,
//       }))
//     } else if (typeof sectionData === 'object') {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [section]: {
//           ...sectionData,
//           [name]: value,
//         },
//       }))
//     }
//   }

//   //changement des donnees avec un objet plus profond
//   const handleChange = <
//     S extends keyof T,
//     M extends keyof T[S],
//     L extends keyof T[S][M],
//   >(
//     section: S,
//     mode: M,
//     language: L,
//     value: T[S][M][L]
//   ) => {
//     setFormData((prevFormData) => {
//       const sectionData = prevFormData[section]
//       const modeData = sectionData[mode] as T[M]
//       if (typeof sectionData === 'object' && typeof modeData === 'object') {
//         return {
//           ...prevFormData,
//           [section]: {
//             ...sectionData,
//             [mode]: {
//               ...modeData,
//               [language]: value,
//             },
//           },
//         }
//       } else {
//         return formData
//       }
//     })
//   }

//   //telecharger image et son
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

//   const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedValue = e.target.value
//     setSelectedOption(selectedValue)
//     setFormData((prevFormData) => {
//       return {
//         ...prevFormData,
//         ['clientId']: selectedValue,
//       }
//     })
//   }

//   const getInput = getInputMedalConfig

//   useEffect(() => {
//     setStep(getInput.length)
//   }, [getInput])

//   useEffect(() => {
//     const fetchClients = async () => {
//       interface ClientData {
//         id: string
//         client?: {
//           company?: {
//             name?: string
//           }
//         }
//         company?: {
//           name?: string
//         }
//       }
//       try {
//         const querySnapshot = await getDocs(collection(db, 'clients'))
//         const clientData: ClientData[] = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...(doc.data() as Omit<ClientData, 'id'>),
//         }))

//         const clientPackageData = clientData
//           .map((item) => {
//             if (item.client?.company?.name) {
//               return { id: item.id, name: item.client.company.name } // Si "client" et "company.name" existent
//             } else if (item.company?.name) {
//               return { id: item.id, name: item.company.name } // Si "company.name" existe directement;
//             }
//             return undefined
//           })
//           .filter(
//             (item): item is { id: string; name: string } => item !== undefined
//           ) //Ce filtre assure à TypeScript que le tableau résultant ne contient que des objets conformes au type { id: string, name: string }.

//         setClientIdAndName(clientPackageData)
//       } catch (error) {
//         console.error('Error fetching data:', error)
//       }
//     }
//     void fetchClients()
//   }, [])

//   //useEffect(() => {
//   //VERIFIER SI USER.ROLE === 'SUPERADMIN' sinon redirection page dashboard
//   //}, [])

//   console.log('FormData:', { ...formData })

//   return (
//     <>
//       <div>
//         <label htmlFor="my_modal_6" className="btn">
//           Choisir le Client
//         </label>

//         <input type="checkbox" id="my_modal_6" className="modal-toggle" />
//         <div className="modal" role="dialog">
//           <div className="modal-box">
//             <h3 className="text-lg font-bold">Sélection</h3>

//             <p className="py-2">Sélection du Client lié au Lieu</p>

//             <select
//               value={selectedOption}
//               onChange={handleSelect}
//               className="select select-bordered select-xs w-full max-w-xs">
//               <option>Choisir le Client</option>
//               {/* {clientIdAndName?.map(({ id, name }, index) => (
//                   <option key={index} value={id}>
//                     {name}
//                   </option>
//                 ))} */}
//             </select>
//             <div className="modal-action">
//               <label htmlFor="my_modal_6" className="btn">
//                 Fermer
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Form
//         clientIdAndName={clientIdAndName && clientIdAndName}
//         handleSelect={handleSelect}
//         selectedOption={selectedOption}
//         title={title}
//         icon={<PlaceIcon />}
//         handleArrowLeft={handleArrowLeft}
//         getInput={getInput}
//         currentStep={currentStep}
//         step={step}
//         message={message}
//         handleSubmit={(event) => {
//           void handleSubmit(event)
//         }}
//         formData={formData}
//         handleInputChange={(section, name, value) => {
//           handleInputChange(section, name, value)
//         }}
//         handleChange={(section, mode, langaue, value) => {
//           handleChange(section, mode, langaue, value)
//         }}
//         handleEdit={handleEditPlace}
//         handlePrevStep={handlePrevStep}
//         handleNextStep={handleNextStep}
//         handleFileUpload={void handleFileUpload}
//       />
//     </>
//   )
// }

// export { FormMedal }
