/* eslint-disable react-hooks/exhaustive-deps */
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AnimatePresence, motion } from 'framer-motion'
import { MouseEvent, useEffect, useRef, useState } from 'react'

import { fetchWithAuth } from '@/api/fetchWithAuth'
import { useAppSelector } from '@/app/hooks'
import { useDescriptions } from '@/app/hooks/useDescriptions'
import { StateAuth } from '@/app/services/redux/slices/reducerAuth'
import { generateUniqueId } from '@/app/services/utils/generateId'
import { DescriptionType, GetInputConfigType, State } from '@/types'

import { WrongCheck } from '../ui/icons/WrongCheck'
import AddDescriptionButton from './AddDescriptionButton'
import MainTextArea from './MainTextArea'

interface DescriptionProps {
  getInput: GetInputConfigType[][]
  currentStep: number
  newIdFromApi: number
  collection: string
  handleSubmitDescriptions?: (descriptions: DescriptionType[]) => void
}
interface SortableItemProps {
  // desc: { id: string }
  desc: DescriptionType
  handleRemoveDesc: (id: string) => void
  imagePreview?: string
  setImagePreview: (preview: string | null) => void
  imgFile?: File
  setImgFile: (file: File | null) => void
}

export default function Description({
  getInput,
  currentStep,
  newIdFromApi,
  collection,
  handleSubmitDescriptions,
}: DescriptionProps) {
  const [language, setLanguage] = useState<string>('fr')
  const [isFalc, setIsFalc] = useState(false)
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({})
  const [imgFiles, setImgFiles] = useState<Record<string, File>>({})
  const { token }: StateAuth = useAppSelector((state: State) => state.auth)

  const { descriptions, setDescriptions } = useDescriptions(
    newIdFromApi,
    collection
  )

  const textareasRef = useRef<Record<string, HTMLTextAreaElement | null>>({})

  useEffect(() => {
    const stepData = getInput[currentStep] || [] // Évite les erreurs si `getInput[currentStep]` est undefined

    if (stepData.length > 0) {
      const { language, mode } = stepData[0] // Prend les valeurs du premier élément de la liste
      setLanguage(language ?? 'fr')
      setIsFalc(mode === 'falc')
    }
  }, [currentStep, getInput])

  useEffect(() => {
    // Vérifie si l'on passe en mode FALC et qu'il y a déjà du texte
    if (isFalc && descriptions.some((desc) => desc.text.length > 0)) {
      const confirmSubmit = window.confirm(
        'ATTENTION Voulez-vous sauvegarder sur le serveur ?'
      )
      if (confirmSubmit) {
        handleSubmitDescriptions?.(descriptions)
      }
      // if (confirmClear) {
      //   setDescriptions((prevDescriptions) =>
      //     prevDescriptions.map((desc) => ({
      //       ...desc,
      //       id: generateUniqueId(), // Nouvel ID unique
      //       text: '', // Efface le texte
      //     }))
      //   )
      // }
    }
  }, [isFalc]) // Déclenché uniquement quand `isFalc` change

  const handleAddDescription = (
    id: string,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault()
    const { value } = event.target

    setDescriptions((prev) =>
      prev.map((desc) =>
        desc.id === id ? { ...desc, text: value } : { ...desc }
      )
    )

    setTimeout(() => {
      if (textareasRef.current[id]) {
        const textarea = textareasRef.current[id]
        //Placer le curseur toujours à la fin du texte
        textarea.focus()
        textarea.setSelectionRange(value.length, value.length)
      }
    }, 0)
  }

  function SortableItem({
    desc,
    handleRemoveDesc,
    imagePreview,
    setImagePreview,
    imgFile,
    setImgFile,
  }: SortableItemProps) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isSorting,
      isDragging,
    } = useSortable({ id: desc.id })

    const style = {
      transform: !isSorting ? CSS.Transform.toString(transform) : undefined,
      transition: !isSorting ? (transition ?? undefined) : undefined,
    }

    //UPLOAD
    const handleFileUpload = async (
      file: File,
      fileType: string,
      event: MouseEvent<HTMLButtonElement>,
      desc: DescriptionType
    ): Promise<void> => {
      event.preventDefault()

      const id = desc.id

      const formUpload = new FormData()
      // Ajout des données dans formUpload
      formUpload.append('file', file) // le fichier image à uploader
      formUpload.append('type', 'image') // type : image ou audio
      formUpload.append('destination', 'Place') // ou journey, step, etc.

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

        setDescriptions((prev) =>
          prev.map((desc) =>
            desc.id === id
              ? { ...desc, [fileType]: imgFile?.name }
              : { ...desc }
          )
        )

        const data: unknown = await response.json()
        console.log('Fichier uploadé avec succès :', data)
      } catch (error) {
        console.error("Erreur lors de l'upload :", error)
        throw error
      }
    }
    return (
      <motion.div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        layout // pour activer les transitions sur le repositionnement
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isDragging ? 0.5 : 1,
          scale: isDragging ? 0.98 : 1,
        }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative mb-4 cursor-grab rounded-xl border bg-base-100 p-4">
        <div className="hero min-h-10 shadow-sm">
          <div className="hero-content flex-col lg:flex-row">
            <MainTextArea
              ref={(el) => {
                if (el) textareasRef.current[desc.id] = el
              }}
              descriptions={[desc]}
              handleAddDescription={handleAddDescription}
              handleFileUpload={(file, fileType, event, desc) => {
                void handleFileUpload(file, fileType, event, desc)
              }}
              language={language}
              isFalc={isFalc}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              imgFile={imgFile}
              setImgFile={setImgFile}
            />
          </div>
        </div>
        <button
          className="absolute right-2 top-2 text-red-500 hover:text-red-700"
          onClick={() => {
            handleRemoveDesc(desc.id)
          }}
          title="Supprimer">
          <WrongCheck className="h-8 w-8" />
        </button>
      </motion.div>
    )
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  //Ajouter une description
  const handleAddDesc = () => {
    setDescriptions([
      ...descriptions,
      {
        id: generateUniqueId(),
        collection: collection,
        collectionId: newIdFromApi,
        language: language,
        order: descriptions.length,
        text: '',
        isFalc: isFalc,
        isCertifiedFalc: false,
        image: '',
        audio: '',
        isValidate: false,
        certifiedDate: null,
        certifiedBy: 0,
      },
    ])
  }

  const handleRemoveDesc = (id: string) => {
    if (
      window.confirm(
        'Etes-vous certain de vouloir supprimer cette descritpion ?'
      )
    )
      setDescriptions(descriptions.filter((desc) => desc.id !== id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = descriptions.findIndex((item) => item.id === active.id)
      const newIndex = descriptions.findIndex((item) => item.id === over?.id)
      setDescriptions(arrayMove(descriptions, oldIndex, newIndex))

      // Mettre à jour les valeurs de `order`
      setDescriptions(
        descriptions.map((desc, index) => ({
          ...desc,
          order: index, // Mise à jour de l’ordre selon la nouvelle position
        }))
      )
    }
  }
  useEffect(() => {
    setDescriptions((prev) => {
      return prev.map((desc, index) =>
        index === 0
          ? {
              ...desc,
              language: language,
              isFalc: isFalc,
            }
          : desc
      )
    })
  }, [language, isFalc])

  console.log('DESCRIPTIONS : ', descriptions)

  return (
    <>
      {/* <DescriptionNavBar /> */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}>
        <SortableContext
          key={descriptions.length}
          items={descriptions}
          strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            {descriptions.map((desc) => (
              <SortableItem
                key={desc.id}
                desc={desc}
                handleRemoveDesc={handleRemoveDesc}
                imagePreview={imagePreviews[desc.id]}
                setImagePreview={(preview) => {
                  if (preview === null) {
                    setImagePreviews((prev) =>
                      Object.fromEntries(
                        Object.entries(prev).filter(([key]) => key !== desc.id)
                      )
                    )
                  } else {
                    setImagePreviews((prev) => ({
                      ...prev,
                      [desc.id]: preview,
                    }))
                  }
                }}
                imgFile={imgFiles[desc.id]}
                setImgFile={(file) => {
                  if (file === null) {
                    setImgFiles((prev) =>
                      Object.fromEntries(
                        Object.entries(prev).filter(([key]) => key !== desc.id)
                      )
                    )
                  } else {
                    setImgFiles((prev) => ({ ...prev, [desc.id]: file }))
                  }
                }}
              />
            ))}
          </AnimatePresence>
        </SortableContext>
      </DndContext>
      <AddDescriptionButton handleAddDesc={handleAddDesc} />
      <div className="flex flex-col items-center justify-center">
        {' '}
        <button
          onClick={() => {
            handleSubmitDescriptions?.(descriptions)
          }}
          className="btn btn-neutral mt-2">
          <p className="mt-1 font-inclusive text-xl">
            Enregistrer sur le serveur
          </p>
        </button>
      </div>
    </>
  )
}
