import successImage from '@img/minos-reussi.png'
import { FormEvent, MouseEvent, useState } from 'react'

import { GetInputConfigType, MessageType, T } from '@/types'

//import Option from './inputForm/Option'
import TextArea from './inputForm/TextArea'

interface InputAreaProps {
  message: MessageType
  handleDescription?: (isShowed: boolean) => void
  showDescription?: boolean
  handleSubmit: (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => void
  getInput: GetInputConfigType[][]
  currentStep: number
  formData: T
  handleInputChange: <S extends keyof T, K extends keyof T[S]>(
    section: S,
    name: K,
    event: T[S][K]
  ) => void
  handleFileUpload: (file: File, fileType: string, name: string) => void
  handleChange: <
    S extends keyof T,
    M extends keyof T[S],
    L extends keyof T[S][M],
  >(
    section: S,
    mode: M,
    language: L,
    event: T[S][M][L]
  ) => void
  handleResponseChange: <
    S extends keyof T,
    M extends keyof T[S],
    L extends keyof T[S][M],
    F extends keyof T[S][M][L],
  >(
    section: S,
    name: M,
    mode: L,
    language: F,
    event: T[S][M][L][F]
  ) => void
}

const InputArea = ({
  message,
  handleSubmit,
  getInput,
  currentStep,
  formData,
  handleInputChange,
  handleFileUpload,
  handleChange,
}: InputAreaProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  //const [audioPreview, setAudioPreview] = useState<string | null>(null)

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string,
    name: string
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      if (type === 'image') {
        if (typeof handleFileUpload !== 'undefined') {
          handleFileUpload(file, 'image', name)
        }
        const imageUrl = URL.createObjectURL(file)
        setImagePreview(imageUrl)
        console.log('imagePreview: ', imagePreview)
      }
    }
  }

  return (
    <div className="flex min-h-max justify-center rounded-xl bg-base-100 p-4 shadow-xl">
      {/*INPUT AREA 1*/}
      {!message.info ? (
        <form
          onSubmit={() => handleSubmit}
          className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark flex w-1/2 flex-col p-2">
          {getInput[currentStep].map(
            ({
              id,
              section,
              rows,
              language,
              type,
              mode,
              name,
              label,
              option,
              placeholder,
              accessType,
              fileType,
              rightSideVisible,
            }) => {
              if (!rightSideVisible) {
                //handleDescription?.(false)
                if (rows) {
                  return (
                    <TextArea
                      id={id}
                      label={label}
                      name={name}
                      placeholder={placeholder}
                      rows={rows}
                      mode={mode}
                      formData={formData}
                      section={section}
                      language={language}
                      handleChange={handleChange}
                      handleInputChange={handleInputChange}
                    />
                  )
                }
                if (type === 'checkbox') {
                  const isChecked = formData[section][
                    name as keyof T[keyof T]
                  ] as boolean
                  return (
                    <div className="form-control mt-4 flex flex-row" key={id}>
                      <label className="label cursor-pointer">
                        <p className="label-text mr-5 font-inclusive text-lg">
                          {label}
                        </p>
                        <input
                          name={name}
                          id={id}
                          type={type}
                          checked={isChecked}
                          onChange={() => {
                            console.error('ERROR MUST CORRECT')
                            alert('ERROR : CONTACT DEV NOW')
                            // handleInputChange(
                            //   section,
                            //   name as keyof T[keyof T],
                            //   !isChecked
                            // )
                          }}
                          className="checkbox"
                        />
                      </label>
                    </div>
                  )
                }

                if (option) {
                  return (
                    <div className="mt-2 flex w-1/2 flex-col" key={id}>
                      <p className="mb-2 font-inclusive text-xl">{label}</p>
                      <select
                        name={name}
                        id={id}
                        value={formData[section][name as keyof T[keyof T]]}
                        onChange={(e) => {
                          handleInputChange(
                            section,
                            name as keyof T[keyof T],
                            e.target.value as T[keyof T][keyof T[keyof T]]
                          )
                        }}
                        className="select select-bordered">
                        {option.map((opt, index: number) => (
                          <option key={index} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  )
                }
                if (type !== 'file' && !rows) {
                  return (
                    <div className="mt-2 flex w-1/2 flex-col" key={id}>
                      <p className="mb-2 font-inclusive text-xl">{label}</p>
                      <input
                        key={id}
                        id={id}
                        name={name}
                        className="input input-bordered"
                        placeholder={placeholder}
                        type={type}
                        value={formData[section][name as keyof T[keyof T]]}
                        onChange={(e) => {
                          handleInputChange(
                            section,
                            name as keyof T[keyof T],
                            e.target.value as T[keyof T][keyof T[keyof T]]
                          )
                        }}
                      />
                    </div>
                  )
                }
                if (fileType) {
                  return (
                    <div className="flex flex-row space-x-10" key={id}>
                      <div className="mb-2 mt-2 flex flex-col">
                        <p className="mb-2 font-inclusive">{label}</p>
                        <input
                          key={id}
                          id={id}
                          name={name}
                          type={type}
                          accept={accessType}
                          onChange={(file) => {
                            handleFileChange(file, fileType, name)
                          }}
                          className="file-input file-input-bordered w-full max-w-xs"
                        />
                      </div>
                      {fileType === 'image' && imagePreview && (
                        <div
                          className="carousel mt-4 w-64 rounded-box"
                          key={`${id}-image`}>
                          <div className="carousel-item w-full">
                            <p className="mb-2 font-inclusive">Aperçu:</p>
                            <img
                              src={imagePreview}
                              alt="Prévisualisation"
                              className="ml-1 mt-4 w-full rounded-xl"
                            />
                          </div>
                        </div>
                      )}
                      {/* {fileType === 'audio' && audioPreview && (
                        <audio controls key={`${id}-audio`}>
                          <source src={audioPreview} type="audio/mpeg" />
                          Votre navigateur ne supporte pas la lecture audio.
                        </audio>
                      )} */}
                    </div>
                  )
                }
              } else {
                if (rows) {
                  // handleDescription?.(true)
                  return (
                    <div className="flex flex-row items-center">
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#4285F4" />

                        <path
                          d="M12 6L14 10H18L15 13L17 17L12 15L7 17L9 13L6 10H10L12 6Z"
                          fill="white"
                        />
                      </svg>
                      <p className="ml-2 font-inclusive text-3xl">
                        {' '}
                        {placeholder}
                      </p>
                    </div>
                  )
                }
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
      {/* {
        //translate s'affiche si il y a une traduction a executer
        getInput[currentStep].map(
          (
            {
              id,
              section,
              rows,
              type,
              name,
              label,
              placeholder,
              //mode,
              //language,
              option,
              rightSideVisible,
            },
            index
          ) => {
            if (rightSideVisible) {
              if (rows) {
                return (
                  <></>
                  // <TextArea
                  //   id={id}
                  //   label={label}
                  //   name={name}
                  //   placeholder={placeholder}
                  //   rows={rows}
                  //   mode={mode}
                  //   formData={formData}
                  //   section={section}
                  //   language={language}
                  //   handleChange={handleChange}
                  //   handleInputChange={handleInputChange}
                  //   rightSideVisible={rightSideVisible}
                  // />
                )
              }

              if (!option && type === 'text') {
                return (
                  <div
                    key={index}
                    className="border-stroke shadow-defaul dark:bg-boxdark w-1/2 rounded-lg border bg-sky-100 p-2">
                    <div className="mt-2 flex flex-col" key={id}>
                      <p className="mb-2 font-inclusive">{label}</p>
                      <input
                        key={id}
                        id={id}
                        name={name}
                        className="input input-bordered w-full max-w-xs"
                        placeholder={placeholder}
                        type={type}
                        value={formData[section][name as keyof T[keyof T]]}
                        onChange={(e) => {
                          handleInputChange(
                            section,
                            name as keyof T[keyof T],
                            e.target.value as T[keyof T][keyof T[keyof T]]
                          )
                        }}
                      />
                    </div>
                    <div>TRANSLATE</div>
                  </div>
                )
              }
            }
          }
        )
      } */}
    </div>
  )
}

export default InputArea
