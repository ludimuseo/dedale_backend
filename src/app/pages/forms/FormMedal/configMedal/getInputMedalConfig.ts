import { GetInputConfigType } from '@/types'

export const getInputMedalConfig: GetInputConfigType[][] = [
  [
    {
      id: '0',
      label: 'Nom',
      name: 'name',
      placeholder: 'Entrez le nom de la Medaille',
      required: true,
      sectionLabel: 'Nom de la Medaille',
      translate: true,
      type: 'text',
    },
  ],
  [
    {
      id: '11',
      label: 'Médaille de Type:',
      name: 'type',
      placeholder: 'Associer la médaille',
      option: ['LIEU', 'PARCOURS', 'ETAPE', 'TOUT TYPE'],
      required: true,
      sectionLabel: 'Type',
      translate: false,
      type: 'number',
    },
    {
      id: '12',
      label: 'Niveau (Facultatif)',
      name: 'level',
      placeholder: 'Niveau de la médaille',
      required: true,
      sectionLabel: 'Niveau',
      translate: false,
    },
  ],
  [
    {
      id: '1',
      accessType: 'image/*',
      fileType: 'image',
      label: 'Image de la Medaille',
      name: 'image',
      placeholder: 'Telecharger l image de la Medaille',
      required: false,
      sectionLabel: 'Image de la Medaille',
      type: 'file',
    },
  ],
]
