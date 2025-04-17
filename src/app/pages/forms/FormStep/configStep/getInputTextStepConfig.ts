import { GetInputConfigType } from '@/types'

export const getInputStepConfig: GetInputConfigType[][] = [
  [
    {
      id: '0',
      label: 'Nom',
      name: 'name',
      placeholder: 'Entrez le nom de l Etape',
      required: true,

      sectionLabel: 'Nom de l Etape',
      translate: true,
      type: 'text',
    },
  ],
  [
    {
      accessType: 'image/*',
      fileType: 'image',
      id: '14',
      label: 'Image de l Etape',
      name: 'image',
      placeholder: 'Telecharger l image de l Etape',
      required: false,

      sectionLabel: 'Image de l Etape',
      type: 'file',
    },
  ],
  [
    {
      id: '3',
      label: 'Adresse',
      name: 'address',
      placeholder: 'Entrez le nom de la rue',
      required: false,

      sectionLabel: 'Adresse',
      translate: false,
      type: 'text',
    },
    {
      id: '4',
      label: 'Ville',
      name: 'city',
      placeholder: 'Entrez la ville',
      required: false,

      sectionLabel: 'Adresse',
      translate: false,
      type: 'text',
    },
    {
      id: '5',
      label: 'Pays',
      name: 'country',
      placeholder: 'Entrez le pays',
      required: false,

      sectionLabel: 'Adresse',
      translate: false,
      type: 'text',
    },
    {
      id: '6',
      label: 'Code postal',
      name: 'postal',
      placeholder: 'Entrez le code postal',
      required: false,

      sectionLabel: 'Adresse',
      translate: false,
      type: 'number',
    },
  ],
  [
    {
      id: '7',
      label: 'Latitude',
      name: 'lat',
      placeholder: 'Entrez la latitude',
      required: false,

      sectionLabel: 'Coordonnées géo.',
      translate: false,
      type: 'number',
    },
    {
      id: '8',
      label: 'Longitude',
      name: 'lon',
      placeholder: 'Entrez la longitude',
      required: false,

      sectionLabel: 'Coordonnées géo.',
      translate: false,
      type: 'number',
    },
    {
      id: '10',
      isLocationRequired: false,
      label: 'Localisation utilisateur obligatoire',
      name: 'location_required',
      placeholder: 'Cochez',
      required: false,

      sectionLabel: 'Coordonnées géo.',
      translate: false,
      type: 'checkbox',
    },
  ],
]
