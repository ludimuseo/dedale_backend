import { FormEvent, MouseEvent, useState } from 'react'

import successImage from '@/assets/imgs/minos-reussi.png'
import { GetInputConfigType, MessageType, T } from '@/types'

//import Option from './inputForm/Option'
import TextArea from './inputForm/TextArea'

interface InputAreaProps {
  message: MessageType
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
  handleFileUpload: (
    file: File,
    fileType: string,
    section: string,
    name: string
  ) => void
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
  const [audioPreview, setAudioPreview] = useState<string | null>(null)

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string,
    section: string,
    name: string
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      if (type === 'image') {
        handleFileUpload(file, 'image', section, name)
        const imageUrl = URL.createObjectURL(file)
        setImagePreview(imageUrl)
        console.log('imagePreview: ', imagePreview)
      }
      if (type === 'audio') {
        handleFileUpload(file, 'audio', section, name)
        const audioUrl = URL.createObjectURL(file)
        setAudioPreview(audioUrl)
        console.log('audioPreview: ', audioPreview)
      }
    }
  }

  return (
    <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark dark:border-strokedark dark:bg-boxdark flex flex-row justify-center rounded-sm border bg-white p-5">
      {/*INPUT AREA 1*/}
      {!message.info ? (
        <form
          onSubmit={() => handleSubmit}
          className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark flex w-1/2 flex-col rounded-sm p-2">
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
                        <span className="label-text mr-7 text-lg">{label}</span>
                        <input
                          name={name}
                          id={id}
                          type={type}
                          checked={isChecked}
                          onChange={() => {
                            handleInputChange(
                              section,
                              name as keyof T[keyof T],
                              !isChecked
                            )
                          }}
                          className="checkbox"
                        />
                      </label>
                    </div>
                  )
                }

                if (option) {
                  return (
                    <div className="mt-2 flex flex-col" key={id}>
                      <span>{label}</span>
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
                        className="select select-bordered w-full max-w-xs">
                        {option.map((opt, index) => (
                          <option key={index} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    // <Option
                    //   label={label}
                    //   id={id}
                    //   name={name}
                    //   section={section}
                    //   option={option}
                    //   handleInputChange={(e) => {
                    //     handleInputChange(
                    //       section,
                    //       name as keyof T[keyof T],
                    //       e.target.value as T[keyof T][keyof T[keyof T]]
                    //     )
                    //   }}
                    // />
                  )
                }
                if (type !== 'file' && !rows) {
                  return (
                    <div className="mt-2 flex flex-col" key={id}>
                      <span>{label}</span>
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
                  )
                }
                if (fileType) {
                  return (
                    <div className="flex flex-row space-x-10">
                      <div className="mb-2 mt-2 flex flex-col" key={id}>
                        <span>{label}</span>
                        <input
                          key={id}
                          id={id}
                          name={name}
                          type={type}
                          accept={accessType}
                          onChange={(file) => {
                            handleFileChange(file, fileType, section, name)
                          }}
                          className="file-input file-input-bordered w-full max-w-xs"
                        />
                      </div>
                      {fileType === 'image' && imagePreview && (
                        <div
                          className="carousel mt-4 w-64 rounded-box"
                          key={`${id}-image`}>
                          <div className="carousel-item w-full">
                            <p>Aperçu:</p>
                            <img
                              src={imagePreview}
                              alt="Prévisualisation"
                              className="ml-1 mt-4 w-full rounded-xl"
                            />
                          </div>
                        </div>
                      )}
                      {fileType === 'audio' && audioPreview && (
                        <audio controls key={`${id}-audio`}>
                          <source src={audioPreview} type="audio/mpeg" />
                          Votre navigateur ne supporte pas la lecture audio.
                        </audio>
                      )}
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
      {
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
              mode,
              language,
              option,
              rightSideVisible,
            },
            index
          ) => {
            if (rightSideVisible) {
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
                    rightSideVisible={rightSideVisible}
                  />
                )
              }

              if (!option && type === 'text') {
                return (
                  <div
                    key={index}
                    className="border-stroke shadow-defaul dark:bg-boxdark w-1/2 rounded-lg border bg-sky-100 p-2">
                    <div className="mt-2 flex flex-col" key={id}>
                      <span>{label}</span>
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
      }
    </div>
  )
}

export default InputArea
