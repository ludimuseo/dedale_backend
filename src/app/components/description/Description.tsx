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
import { useRef, useState } from 'react'

import { WrongCheck } from '../ui/icons/WrongCheck'
import AddDescriptionButton from './AddDescriptionButton'
import FileUploadArea from './FileUploadArea'
import MainTextArea from './MainTextArea'

interface SortableItemProps {
  desc: { id: number }
  handleRemoveDesc: (id: number) => void
}

export interface Description {
  id: number
  language: 'fr' | 'en'
  order: number
  text: string
  isFalc: boolean
  isCertifiedFalc: boolean
  image: {
    file: string
    alt: string
  }

  audio: {
    file: string
    audio_desc: string
  }
}

export default function Description() {
  const [descriptions, setDescriptions] = useState<Description[]>([
    {
      id: Date.now(),
      language: 'fr',
      order: 0,
      text: '',
      isFalc: false,
      isCertifiedFalc: false,
      image: {
        file: '',
        alt: '',
      },
      audio: {
        file: '',
        audio_desc: '',
      },
    },
  ])

  const textareasRef = useRef<Record<number, HTMLTextAreaElement | null>>({})

  const handleAddDescription = (
    id: number,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault()
    const { value } = event.target

    setDescriptions((prev) =>
      prev.map((desc) => (desc.id === id ? { ...desc, text: value } : desc))
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
            <FileUploadArea />
            <MainTextArea
              ref={(el) => {
                if (el) textareasRef.current[desc.id] = el
              }}
              descriptions={[desc as Description]}
              handleAddDescription={handleAddDescription}
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
        id: Date.now() + Math.random(),
        language: 'fr',
        order: 0,
        text: '',
        isFalc: false,
        isCertifiedFalc: false,
        image: {
          file: '',
          alt: '',
        },
        audio: {
          file: '',
          audio_desc: '',
        },
      },
    ])
  }

  const handleRemoveDesc = (id: number) => {
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
    }
  }

  console.log('descriptions: ', descriptions)
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
    </>
  )
}
