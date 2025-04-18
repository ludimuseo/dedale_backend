import { GetInputConfigType } from '@/types'

export const getInputPieceConfig: GetInputConfigType[][] = [
  [
    {
      id: '0',
      label: "Nom de l'Oeuvre",
      name: 'name',
      placeholder: "Entrez le nom de l'Oeuvre",
      required: true,
      sectionLabel: 'Nom de l Oeuvre',
      translate: true,
      type: 'text',
    },
  ],
  [
    {
      accessType: 'image/*',
      fileType: 'image',
      id: '14',
      label: "Image de 'Oeuvre",
      name: 'image',
      placeholder: 'Telecharger l image de l Oeuvre',
      required: false,
      sectionLabel: 'Image de l Oeuvre',
      type: 'file',
    },
  ],
]
