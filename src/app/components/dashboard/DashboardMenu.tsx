import { motion } from 'framer-motion'
import { type FC, MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router'

import { fetchWithAuth } from '@/api/fetchWithAuth'
import { useAppSelector } from '@/app/hooks'
import { DashboardConfig } from '@/app/pages/dashboard/getDashboardConfig'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { MENU } from '@/enums/icons'
import { State } from '@/types'

interface DashboardMenuProps {
  menu: DashboardConfig[]
  auth: StateAuth
}

const DashboardMenu: FC<DashboardMenuProps> = ({ menu, auth }) => {
  const navigate = useNavigate()
  const userRole = auth.user?.role ?? 'CORRECTOR'
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imgFile, setImgFile] = useState<File | null>(null)
  const [imgName, setImgName] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const { token }: StateAuth = useAppSelector((state: State) => state.auth)

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
      return
    }

    // Validation de la taille
    if (file.size > MAX_FILE_SIZE) {
      const MAX_SIZE = MAX_FILE_SIZE / (1024 * 1024)
      setUploadError(
        `Fichier trop volumineux. Taille max: ${MAX_SIZE.toString()}MB`
      )

      return
    }

    if (type === 'image') {
      setImgFile(file)
      setImgName(name)

      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)
    }
  }

  const handleFileUpload = async (
    file: File,
    fileType: 'image',
    name: string,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    const formUpload = new FormData()
    // Ajout des données dans formUpload
    formUpload.append('file', file) // le fichier image à uploader
    formUpload.append('type', 'image') // type : image ou audio
    formUpload.append('destination', 'Journey') // ou journey, step, etc.
    console.log('SEND IMAGE:', name, ' ', fileType)
    console.log('file: ', file)

    try {
      const response: Response = await fetchWithAuth(
        'https://dev.ludimuseo.fr:4000/api/upload',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formUpload, // Attention : pas de Content-Type ici, FormData le gère
        }
      )

      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status.toString()}`)
      }
      const data: unknown = await response.json()
      console.log('Fichier uploadé avec succès :', data)
    } catch (error) {
      console.error("Erreur lors de l'upload :", error)
      throw error
    }
  }

  const handleUploadToServer = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!imgFile) return

    setIsUploading(true)
    setUploadError(null)
    setUploadSuccess(false)

    try {
      void handleFileUpload(imgFile, 'image', imgName, event)
      setUploadSuccess(true)
      // Réinitialiser après un délai pour permettre à l'utilisateur de voir le message de succès
      setTimeout(() => {
        setUploadSuccess(false)
        setImagePreview(null)
        setImgFile(null)
      }, 5000)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError("Échec de l'envoi du fichier. Veuillez réessayer.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-row items-center justify-center">
        {menu.map((item, index: number) => {
          if (item.role.includes(userRole))
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.4,
                  ease: 'easeInOut',
                }}
                key={item.id}
                className="card w-96 cursor-pointer bg-base-100 shadow-xl"
                aria-label={item.ariaLabel}
                tabIndex={index}
                onClick={() => void navigate(item.route)}>
                <figure className="aspect-video scale-75 p-4">
                  {MENU[item.image]}
                </figure>
                <hr className="mt-2 border-gray-300" />
                <div className="card-body rounded-xl bg-sky-50 dark:bg-sky-950">
                  <h2 className="card-title">{item.title}</h2>
                  <p className="font-inclusive">{item.subTitle}</p>
                </div>
              </motion.div>
            )
        })}
      </div>
      <h1 className="mt-10">TEST Upload</h1>
      <div className="flex flex-row space-x-10">
        <div className="mb-2 mt-2 flex flex-col">
          <input
            id={'10'}
            name={'name'}
            type={'file'}
            accept={'image'}
            onChange={(e) => {
              handleFileChange(e, 'image')
            }}
            className="file-input file-input-primary w-full max-w-xs"
          />

          {/* Messages d'état */}
          {uploadError && (
            <div className="text-XL mt-2 text-error">{uploadError}</div>
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
              onClick={handleUploadToServer}
              disabled={isUploading}>
              {isUploading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Enregistrer sur le serveur'
              )}
            </button>
          )}
        </div>

        {imagePreview && (
          <div>
            <p className="mt-2 font-inclusive text-xl">Aperçu:</p>
            <div className="carousel mt-4 w-64 rounded-box" key={`$new-image`}>
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
    </>
  )
}

export { DashboardMenu }
