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

import { useDescriptions } from '@/app/hooks/useDescriptions'
import { generateUniqueId } from '@/app/services/utils/generateId'
import { DescriptionType, GetInputConfigType } from '@/types'

import { WrongCheck } from '../ui/icons/WrongCheck'
import AddDescriptionButton from './AddDescriptionButton'
import FileUploadArea from './FileUploadArea'
import MainTextArea from './MainTextArea'

interface DescriptionProps {
  getInput: GetInputConfigType[][]
  currentStep: number
  newIdFromApi: number
  collection: string
  handleSubmitDescriptions?: (descriptions: DescriptionType[]) => void
  handleFileUpload: (
    file: File,
    fileType: string,
    name: string,
    event: MouseEvent<HTMLButtonElement>
  ) => void
}
interface SortableItemProps {
  desc: { id: string }
  handleRemoveDesc: (id: string) => void
}

export default function Description({
  getInput,
  currentStep,
  newIdFromApi,
  collection,
  handleSubmitDescriptions,
  handleFileUpload,
}: DescriptionProps) {
  const [language, setLanguage] = useState<string | undefined>('fr')
  const [isFalc, setIsFalc] = useState(false)
  const { descriptions, setDescriptions } = useDescriptions(
    newIdFromApi,
    collection
  )

  const textareasRef = useRef<Record<string, HTMLTextAreaElement | null>>({})

  useEffect(() => {
    const stepData = getInput[currentStep] || [] // Évite les erreurs si `getInput[currentStep]` est undefined

    if (stepData.length > 0) {
      const { language, mode } = stepData[0] // Prend les valeurs du premier élément de la liste
      setLanguage(language)
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
        handleSubmitDescriptions(descriptions)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function SortableItem({ desc, handleRemoveDesc }: SortableItemProps) {
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
            <FileUploadArea handleFileUpload={handleFileUpload} />
            <div>
              {language === 'fr' ? (
                <svg width="32" height="24" viewBox="0 0 16 16">
                  <rect width="5" height="16" fill="#002654" />
                  <rect x="5" width="6" height="16" fill="#FFFFFF" />
                  <rect x="11" width="5" height="16" fill="#ED2939" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 16 16">
                  <rect width="16" height="16" fill="#FFFFFF" />
                  <rect y="7" width="16" height="2" fill="#C8102E" />
                  <rect x="7" width="2" height="16" fill="#C8102E" />
                </svg>
              )}
            </div>

            <MainTextArea
              ref={(el) => {
                if (el) textareasRef.current[desc.id] = el
              }}
              descriptions={[desc as DescriptionType]}
              handleAddDescription={handleAddDescription}
              language={language}
              isFalc={isFalc}
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
        language: language ?? 'fr',
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

  console.log('DESCRIPTIONS descriptions: ', descriptions)

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
                handleRemoveDesc={() => {
                  handleRemoveDesc(desc.id)
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
