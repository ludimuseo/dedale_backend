import { MouseEvent, useEffect, useRef, useState } from 'react'

import { DescriptionType } from '@/types'

interface FileUploadAreaProps {
  handleFileUpload: (
    file: File,
    fileType: string,
    event: MouseEvent<HTMLButtonElement>,
    desc: DescriptionType
  ) => void
  desc: DescriptionType
  imagePreview?: string
  setImagePreview: (preview: string | null) => void
  imgFile?: File
  setImgFile: (file: File | null) => void
}

type FileType = 'image' | 'audio'

export default function FileUploadArea({
  handleFileUpload,
  desc,
  imagePreview,
  setImagePreview,
  imgFile,
  setImgFile,
}: FileUploadAreaProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const acceptedFileTypes: Record<FileType, string[]> = {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: FileType
  ) => {
    event.preventDefault()
    setUploadError(null)
    setUploadSuccess(false)

    const file = event.target.files?.[0]

    if (!file) return

    // Validation du type de fichier
    if (!acceptedFileTypes[type].includes(file.type)) {
      setUploadError(
        `Type de fichier non supporté. Formats acceptés: ${acceptedFileTypes[type].join(', ')}`
      )
      resetFileInput()
      return
    }

    // Validation de la taille
    if (file.size > MAX_FILE_SIZE) {
      const MAX_SIZE = MAX_FILE_SIZE / (1024 * 1024)
      setUploadError(
        `Fichier trop volumineux. Taille max: ${String(MAX_SIZE)}MB`
      )
      resetFileInput()
      return
    }

    if (type === 'image') {
      setImgFile(file)
      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)
    }
  }

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  //////////////////////////////UPLOAD SERVER////////////////////////////////////
  const handleUploadToServer = (event: MouseEvent<HTMLButtonElement>) => {
    if (!imgFile) return

    setIsUploading(true)
    setUploadError(null)
    setUploadSuccess(false)

    try {
      handleFileUpload(imgFile, 'image', event, desc)
      setUploadSuccess(true)
      console.log('FileUpload imgFile: ', imgFile.name)

      // Réinitialiser après un délai pour permettre à l'utilisateur de voir le message de succès
      setTimeout(() => {
        setUploadSuccess(false)
        //   setImagePreview(null)
        //   setImgFile(null)
        //   resetFileInput()
      }, 10000)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError("Échec de l'envoi du fichier. Veuillez réessayer.")
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <p className="mb-2 font-inclusive">Télécharger l'image</p>
        <input
          type="file"
          ref={fileInputRef}
          accept={acceptedFileTypes.image.join(',')}
          onChange={(e) => {
            handleFileChange(e, 'image')
          }}
          className="file-input file-input-bordered file-input-info w-full max-w-xs"
        />

        {/* Aperçu de l'image */}
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Aperçu"
              className="max-h-48 max-w-xs rounded-lg object-contain shadow-2xl"
            />
          </div>
        )}

        {/* Messages d'état */}
        {uploadError && <div className="mt-2 text-error">{uploadError}</div>}
        {uploadSuccess && (
          <div className="mt-2 text-success">Fichier envoyé avec succès!</div>
        )}

        {/* Bouton d'envoi */}
        {imagePreview && (
          <button
            className="btn btn-neutral mt-4"
            onClick={(event) => {
              handleUploadToServer(event)
            }}
            disabled={isUploading}>
            {isUploading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Enregistrer sur le serveur'
            )}
          </button>
        )}
      </div>

      <div>
        <p className="mb-2 font-inclusive">Télécharger l'audio</p>
        <input
          type="file"
          accept={acceptedFileTypes.audio.join(',')}
          onChange={(e) => {
            handleFileChange(e, 'audio')
          }}
          className="file-input-neutral file-input file-input-bordered w-full max-w-xs"
        />
      </div>
    </div>
  )
}
