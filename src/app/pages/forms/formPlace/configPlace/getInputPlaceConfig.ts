import { GetInputConfigType } from '@/types'

export const getInputPlaceConfig: GetInputConfigType[][] = [
  [
    {
      id: '011',
      label: 'Type de lieu',
      name: 'type',
      option: ['museum', 'castle', 'outdoor'],
      placeholder: 'Selectionnez le type',
      required: true,
      section: 'content',
      sectionLabel: 'Type de Lieu',
      translate: false,
    },
  ],
  [
    {
      id: '0',
      label: 'Nom',
      name: 'fr',
      placeholder: 'Entrez le nom du lieu',
      required: true,
      section: 'name',
      sectionLabel: 'Nom du Lieu',
      translate: true,
      type: 'text',
    },
    {
      id: '100',
      label: 'Name (English)',
      language: 'en',
      name: 'en',
      placeholder: 'Entrez le nom du lieu',
      required: true,
      rightSideVisible: true,
      section: 'name',
      sectionLabel: 'Nom du lieu',
      type: 'text',
    },
  ],
  [
    {
      accessType: 'image/*',
      fileType: 'image',
      id: '14',
      label: 'Image du lieu',
      name: 'image',
      placeholder: 'Telecharger l image du lieu',
      required: false,
      section: 'content',
      sectionLabel: 'Image du lieu',
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
      section: 'address',
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
      section: 'address',
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
      section: 'address',
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
      section: 'address',
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
      section: 'coords',
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
      section: 'coords',
      sectionLabel: 'Coordonnées géo.',
      translate: false,
      type: 'number',
    },
    {
      id: '10',
      isLocationRequired: false,
      label: 'Localisation utilisateur obligatoire',
      name: 'locationRequired',
      placeholder: 'Cochez',
      required: false,
      section: 'coords',
      sectionLabel: 'Coordonnées géo.',
      translate: false,
      type: 'checkbox',
    },
  ],
  [
    {
      id: '11',
      label: 'Description Standard',
      language: 'fr',
      mode: 'standard',
      name: 'description',
      placeholder: 'Entrez la description du lieu',
      required: false,
      rows: 10,
      section: 'description',
      sectionLabel: 'Descripton standard',
      translate: true,
      type: 'text',
    },
    {
      id: '110',
      label: 'Description Standard (ENGLISH)',
      language: 'en',
      mode: 'standard',
      name: 'descritpion',
      placeholder: 'Entrez la description du lieu en Anglais',
      required: false,
      rightSideVisible: true,
      rows: 10,
      section: 'description',
      sectionLabel: 'Descripton standard',
      type: 'text',
    },
  ],
  [
    {
      id: '12',
      label: 'Description FALC ou Facile à lire',
      language: 'fr',
      mode: 'falc',
      name: 'falc',
      placeholder: 'Entrez la description facile a lire du lieu',
      required: false,
      rows: 10,
      section: 'description',
      sectionLabel: 'Descripton FALC',
      translate: true,
      type: 'text',
    },
    {
      id: '120',
      label: 'Description FALC ou Facile à lire (ENGLISH)',
      language: 'en',
      mode: 'falc',
      name: 'descritpion',
      placeholder: 'Entrez la description FALC du lieu en anglais',
      required: false,
      rightSideVisible: true,
      rows: 10,
      section: 'description',
      sectionLabel: 'Descripton standard',
      type: 'text',
    },
  ],
  [
    {
      accessType: 'audio/*',
      fileType: 'audio',
      id: '13',
      label: 'Audio standard',
      language: 'fr',
      name: 'standard',
      placeholder: 'Telecharger l audio du lieu',
      required: false,
      section: 'audio',
      sectionLabel: 'Audio standard',
      type: 'file',
    },
    {
      accessType: 'audio/*',
      fileType: 'audio',
      id: '130',
      label: 'Audio standard (English)',
      language: 'en',
      name: 'standard',
      placeholder: 'Telecharger l audio du lieu',
      required: false,
      section: 'audio',
      sectionLabel: 'Audio standard',
      type: 'file',
    },
  ],
  [
    {
      accessType: 'audio/*',
      fileType: 'audio',
      id: '15',
      label: 'Audio FALC ou Facile a lire et à comprendre',
      language: 'fr',
      name: 'falc',
      placeholder: 'Telecharger l audio FALC du lieu',
      required: false,
      section: 'audio',
      sectionLabel: 'Audio FALC',
      type: 'file',
    },
    {
      accessType: 'audio/*',
      fileType: 'audio',
      id: '150',
      label: 'Audio FALC ou Facile a lire (English)',
      language: 'en',
      name: 'falc',
      placeholder: 'Telecharger l audio FALC traduit du lieu',
      required: false,
      section: 'audio',
      sectionLabel: 'Audio FALC',
      type: 'file',
    },
  ],
]
