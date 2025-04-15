import successImage from '@img/minos-reussi.png'
import { FormEvent, MouseEvent, useRef, useState } from 'react'

import {
  ClientType,
  GetInputConfigType,
  MessageType,
  PlaceType,
  T,
} from '@/types'

import TextArea from './inputForm/TextArea'

interface InputAreaProps {
  message: MessageType
  handleSubmit: (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => void
  getInput: GetInputConfigType[][]
  currentStep: number
  formData: T | PlaceType | ClientType
  handleInputChange: (name: string, event: string) => void
  handleFileUpload: (
    file: File,
    fileType: string,
    name: string
  ) => Promise<void>
  // handleChange: <S extends keyof T, M extends keyof T[S], L extends keyof T[S][M]>(
  //   section: S,
  //   mode: M,
  //   language: L,
  //   event: T[S][M][L]
  // ) => void;
}

const InputArea = ({
  message,
  handleSubmit,
  getInput,
  currentStep,
  formData,
  handleInputChange,
  handleFileUpload,
  //handleChange,
}: InputAreaProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imgFile, setImgFile] = useState<File | null>(null)
  const [imgName, setImgName] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const acceptedFileTypes = {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    event.preventDefault()
    setUploadError(null)
    setUploadSuccess(false)

    const file = event.target.files?.[0]
    const name = event.target.name

    if (!file) return

    // Validation du type de fichier
    if (
      !acceptedFileTypes[type as keyof typeof acceptedFileTypes].includes(
        file.type
      )
    ) {
      setUploadError(
        `Type de fichier non supporté. Formats acceptés: ${acceptedFileTypes[type as keyof typeof acceptedFileTypes].join(', ')}`
      )
      resetFileInput()
      return
    }

    // Validation de la taille
    if (file.size > MAX_FILE_SIZE) {
      const MAX_SIZE = MAX_FILE_SIZE / (1024 * 1024)
      setUploadError(
        `Fichier trop volumineux. Taille max: ${MAX_SIZE.toString()}MB`
      )
      resetFileInput()
      return
    }

    if (type === 'image') {
      setImgFile(file)
      setImgName(name)

      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)
    }
  }

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUploadToServer = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!imgFile) return

    setIsUploading(true)
    setUploadError(null)
    setUploadSuccess(false)

    try {
      await handleFileUpload(imgFile, 'image', imgName)
      setUploadSuccess(true)
      // Réinitialiser après un délai pour permettre à l'utilisateur de voir le message de succès
      setTimeout(() => {
        setUploadSuccess(false)
        setImagePreview(null)
        setImgFile(null)
        resetFileInput()
      }, 5000)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError("Échec de l'envoi du fichier. Veuillez réessayer.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex min-h-max justify-center rounded-xl bg-base-100 p-4 shadow-xl">
      {!message.info ? (
        <form
          onSubmit={handleSubmit}
          className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark flex w-1/2 flex-col p-2">
          {getInput[currentStep].map(
            ({
              id,
              rows,
              language,
              type,
              mode,
              name,
              label,
              option,
              placeholder,
              fileType,
              rightSideVisible,
            }) => {
              if (!rightSideVisible) {
                if (rows) {
                  return (
                    <TextArea
                      key={id}
                      id={id}
                      label={label}
                      name={name}
                      placeholder={placeholder}
                      rows={rows}
                      mode={mode}
                      formData={formData}
                      language={language}
                      //handleChange={handleChange}
                      handleInputChange={handleInputChange}
                    />
                  )
                }

                if (type === 'checkbox') {
                  const isChecked = formData[
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
                            handleInputChange(name, !isChecked)
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
                        value={formData[name as keyof T[keyof T]]}
                        onChange={(e) => {
                          handleInputChange(name, e.target.value)
                        }}
                        className="select select-bordered font-inclusive text-lg">
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
                        value={formData[name as keyof T[keyof T]]}
                        onChange={(e) => {
                          handleInputChange(name, e.target.value)
                        }}
                      />
                    </div>
                  )
                }

                if (fileType) {
                  return (
                    <div className="flex flex-row space-x-10" key={id}>
                      <div className="mb-2 mt-2 flex flex-col">
                        <p className="mb-2 text-center font-inclusive text-lg">
                          {label}
                        </p>
                        <input
                          ref={fileInputRef}
                          key={id}
                          id={id}
                          name={name}
                          type={type}
                          accept={acceptedFileTypes[
                            fileType as keyof typeof acceptedFileTypes
                          ].join(',')}
                          onChange={(e) => {
                            handleFileChange(e, fileType)
                          }}
                          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                        />

                        {/* Messages d'état */}
                        {uploadError && (
                          <div className="text-XL mt-2 text-error">
                            {uploadError}
                          </div>
                        )}
                        {uploadSuccess && (
                          <div className="text-XL mt-2 text-success">
                            Fichier envoyé avec succès!
                          </div>
                        )}

                        {/* Bouton d'envoi */}
                        {imagePreview && (
                          <button
                            className="btn btn-neutral mt-4"
                            onClick={void handleUploadToServer}
                            disabled={isUploading}>
                            {isUploading ? (
                              <span className="loading loading-spinner"></span>
                            ) : (
                              'Enregistrer sur le serveur'
                            )}
                          </button>
                        )}
                      </div>

                      {fileType === 'image' && imagePreview && (
                        <div>
                          <p className="mt-2 font-inclusive text-xl">Aperçu:</p>
                          <div
                            className="carousel mt-4 w-64 rounded-box"
                            key={`${id}-image`}>
                            <div className="carousel-item w-full">
                              <img
                                src={imagePreview}
                                alt="Prévisualisation"
                                className="ml-1 w-full rounded-xl"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                }
              }
            }
          )}
        </form>
      ) : (
        <div className="border-stroke shadow-defaul dark:border-strokedark dark:bg-boxdark mt-5 flex w-1/2 flex-col items-center rounded-sm p-2">
          <h1> 🚀 {message.info}</h1>
          <img
            width="30%"
            src={successImage}
            alt="Success Minos"
            className="mt-10"
          />
        </div>
      )}
    </div>
  )
}

export default InputArea
