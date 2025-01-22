import { GetInputConfigType } from '@/types'

export const getInputGameConfig: GetInputConfigType[][] = [
  [
    {
      id: '0',
      label: 'Titre du jeu',
      name: 'fr',
      placeholder: 'Entrez le titre du jeu',
      required: true,
      section: 'name',
      sectionLabel: 'Titre du jeu',
      translate: true,
      type: 'text',
    },
    {
      id: '01',
      label: 'Name (English)',
      language: 'en',
      name: 'en',
      placeholder: 'Entrez le titre du jeu (English)',
      required: true,
      rightSideVisible: true,
      section: 'name',
      sectionLabel: 'Titre de jeu',
      type: 'text',
    },
  ],
  [
    {
      id: '20',
      label: 'Type de jeu',
      name: 'type',
      option: ['Quiz'],
      placeholder: 'Selectionnez le type',
      required: true,
      section: 'content',
      sectionLabel: 'Type de jeu',
      translate: false,
    },
    {
      id: '21',
      label: 'Niveau du jeu',
      name: 'type',
      option: ['Novice', 'Intermédiare', 'Expert'],
      placeholder: 'Selectionnez le niveau du jeu',
      required: true,
      section: 'content',
      sectionLabel: 'Type de jeu',
      translate: false,
    },
  ],
  [
    {
      id: '30',
      accessType: 'image/*',
      fileType: 'image',
      label: 'Image du jeu',
      name: 'image',
      placeholder: 'Telecharger l image du jeu',
      required: false,
      section: 'content',
      sectionLabel: 'Image du jeu',
      type: 'file',
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
      placeholder: 'Telecharger l audio du quiz',
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
      placeholder: 'Telecharger l audio du quiz',
      required: false,
      section: 'audio',
      sectionLabel: 'Audio standard',
      type: 'file',
    },
  ],
  [
    {
      id: '15',
      accessType: 'audio/*',
      fileType: 'audio',
      label: 'Audio FALC ou Facile a lire et à comprendre',
      language: 'fr',
      name: 'falc',
      placeholder: 'Telecharger l audio FALC de l Etape',
      required: false,
      section: 'audio',
      sectionLabel: 'Audio FALC',
      type: 'file',
    },
    {
      id: '150',
      accessType: 'audio/*',
      fileType: 'audio',
      label: 'Audio FALC ou Facile a lire (English)',
      language: 'en',
      name: 'falc',
      placeholder: 'Telecharger l audio FALC traduit de l Etape',
      required: false,
      section: 'audio',
      sectionLabel: 'Audio FALC',
      type: 'file',
    },
  ],
  [
    {
      id: '31',
      label: 'Question',
      language: 'fr',
      mode: 'standard',
      name: 'question',
      placeholder: 'Entrez la question du quiz',
      required: false,
      rows: 1,
      section: 'question',
      sectionLabel: 'Question standard',
      translate: true,
      type: 'text',
    },
    {
      id: '32',
      label: 'Question (ENGLISH)',
      language: 'en',
      mode: 'standard',
      name: 'question',
      placeholder: 'Entrez la question du jeu (ENGLISH)',
      required: false,
      rightSideVisible: true,
      rows: 1,
      section: 'question',
      sectionLabel: 'Question standard',
      type: 'text',
    },
  ],
  [
    {
      id: '40',
      label: 'Question FALC ou Facile à lire',
      language: 'fr',
      mode: 'falc',
      name: 'question',
      placeholder: 'Entrez la question facile du quiz',
      required: false,
      section: 'question',
      sectionLabel: 'Question FALC',
      translate: true,
      type: 'text',
    },
    {
      id: '41',
      label: 'Question FALC ou Facile à lire (ENGLISH)',
      language: 'en',
      mode: 'falc',
      name: 'question',
      placeholder: 'Entrez la question FALC du quiz (ENGLISH)',
      required: false,
      rightSideVisible: true,
      section: 'question',
      sectionLabel: 'Question FALC',
      type: 'text',
    },
  ],
  //REPONSE VRAI
  [
    {
      id: '50',
      label: 'Réponse VRAIE',
      language: 'fr',
      mode: 'standard',
      name: 'responseTrue',
      placeholder: 'Entrez la réponse VRAI du quiz',
      required: false,
      section: 'response',
      sectionLabel: 'Réponse VRAIE',
      translate: true,
      type: 'text',
    },
    {
      id: '51',
      label: 'Réponse VRAIE (ENGLISH)',
      language: 'en',
      mode: 'standard',
      name: 'responseTrue',
      placeholder: 'Entrez la réponse du quiz (ENGLISH)',
      rightSideVisible: true,
      required: false,
      section: 'response',
      sectionLabel: 'Réponse VRAIE',
      type: 'text',
    },
  ],
  [
    {
      id: '52',
      label: 'Réponse FALC',
      language: 'fr',
      mode: 'falc',
      name: 'responseTrue',
      placeholder: 'Entrez la réponse FALC du quiz',
      required: false,
      section: 'response',
      sectionLabel: 'Réponse Vrai FALC',
      translate: true,
      type: 'text',
    },
    {
      id: '53',
      label: 'Réponse falc (ENGLISH)',
      language: 'en',
      mode: 'falc',
      name: 'responseTrue',
      placeholder: 'Entrez la réponse FALC du quiz (ENGLISH)',
      rightSideVisible: true,
      required: false,
      section: 'response',
      sectionLabel: 'Réponse Vrai FALC',
      type: 'text',
    },
  ],
  //EXPLICATION REPONSE VRAI
  [
    {
      id: '54',
      label: 'Explication reponse Vrai',
      language: 'fr',
      mode: 'standard',
      name: 'responseTrue',
      placeholder: 'Entrez l explication reponse Vrai',
      required: false,
      rows: 10,
      section: 'explanation',
      sectionLabel: 'Explication Vrai',
      translate: true,
      type: 'text',
    },
    {
      id: '55',
      label: 'Explication standard (ENGLISH)',
      language: 'en',
      mode: 'standard',
      name: 'responseTrue',
      placeholder: 'Entrez la réponse du quiz (ENGLISH)',
      rightSideVisible: true,
      rows: 10,
      required: false,
      section: 'explanation',
      sectionLabel: 'Explication Vrai',
      type: 'text',
    },
  ],
  [
    {
      id: '56',
      label: 'Explication Vrai FALC',
      language: 'fr',
      mode: 'falc',
      name: 'responseTrue',
      placeholder: 'Entrez la réponse FALC du quiz',
      required: false,
      rows: 10,
      section: 'explanation',
      sectionLabel: 'Explication Vrai FALC',
      translate: true,
      type: 'text',
    },
    {
      id: '57',
      label: 'Explication Vrai falc (ENGLISH)',
      language: 'en',
      mode: 'falc',
      name: 'responseTrue',
      placeholder: 'Entrez l explication FALC du quiz (ENGLISH)',
      rightSideVisible: true,
      rows: 10,
      required: false,
      section: 'explanation',
      sectionLabel: 'Explication Vrai FALC',
      type: 'text',
    },
  ],
  //REPONSE FAUSSE 1
  [
    {
      id: '60',
      label: 'Réponse FAUSSE',
      language: 'fr',
      mode: 'standard',
      name: 'response1',
      placeholder: 'Entrez la fausse réponse 1 du quiz',
      required: false,
      section: 'response',
      sectionLabel: 'Réponse fausse 1',
      translate: true,
      type: 'text',
    },
    {
      id: '61',
      label: 'Réponse fausse (ENGLISH)',
      language: 'en',
      mode: 'standard',
      name: 'response2',
      placeholder: 'Entrez la fausse reponse 1 du quiz (ENGLISH)',
      rightSideVisible: true,
      required: false,
      section: 'response',
      sectionLabel: 'Réponse fausse 1',
      type: 'text',
    },
  ],
  [
    {
      id: '62',
      label: 'Réponse fausse 1 FALC',
      language: 'fr',
      mode: 'falc',
      name: 'response1',
      placeholder: 'Entrez la réponse fausse 1 FALC',
      required: false,
      section: 'response',
      sectionLabel: 'Réponse fausse 1 FALC',
      translate: true,
      type: 'text',
    },
    {
      id: '63',
      label: 'Réponse fausse 1 falc (ENGLISH)',
      language: 'en',
      mode: 'falc',
      name: 'response1',
      placeholder: 'Entrez la réponse fausse 1 FALC (ENGLISH)',
      rightSideVisible: true,
      required: false,
      section: 'response',
      sectionLabel: 'Réponse fausse 1 FALC',
      type: 'text',
    },
  ],
  //EXPLICATION REPONSE FAUSSE 1
  [
    {
      id: '64',
      label: 'Explication reponse fausse 1',
      language: 'fr',
      mode: 'standard',
      name: 'response1',
      placeholder: 'Entrez l explication&é fausse 1',
      required: false,
      rows: 10,
      section: 'explanation',
      sectionLabel: 'Explication Fausse 1',
      translate: true,
      type: 'text',
    },
    {
      id: '65',
      label: 'Explication standard (ENGLISH)',
      language: 'en',
      mode: 'standard',
      name: 'response1',
      placeholder: 'Entrez la réponse du quiz (ENGLISH)',
      rightSideVisible: true,
      rows: 10,
      required: false,
      section: 'explanation',
      sectionLabel: 'Explication Fausse 1',
      type: 'text',
    },
  ],
  [
    {
      id: '66',
      label: 'Explication Vrai FALC',
      language: 'fr',
      mode: 'falc',
      name: 'responseTrue',
      placeholder: 'Entrez la réponse FALC du quiz',
      required: false,
      rows: 10,
      section: 'explanation',
      sectionLabel: 'Explication Fausse 1 FALC',
      translate: true,
      type: 'text',
    },
    {
      id: '67',
      label: 'Explication Vrai falc (ENGLISH)',
      language: 'en',
      mode: 'falc',
      name: 'responseTrue',
      placeholder: 'Entrez l explication FALC du quiz (ENGLISH)',
      rightSideVisible: true,
      rows: 10,
      required: false,
      section: 'explanation',
      sectionLabel: 'Explication Fausse 1 FALC',
      type: 'text',
    },
  ],
  //REPONSE FAUSSE 2
  [
    {
      id: '60',
      label: 'Réponse FAUSSE 2',
      language: 'fr',
      mode: 'standard',
      name: 'response2',
      placeholder: 'Entrez la fausse réponse 2 du quiz',
      required: false,
      section: 'response',
      sectionLabel: 'Réponse fausse 2',
      translate: true,
      type: 'text',
    },
    {
      id: '61',
      label: 'Réponse fausse (ENGLISH)',
      language: 'en',
      mode: 'standard',
      name: 'response2',
      placeholder: 'Entrez la fausse reponse 2 du quiz (ENGLISH)',
      rightSideVisible: true,
      required: false,
      section: 'response',
      sectionLabel: 'Réponse fausse 2',
      type: 'text',
    },
  ],
  [
    {
      id: '62',
      label: 'Réponse fausse 2 FALC',
      language: 'fr',
      mode: 'falc',
      name: 'response2',
      placeholder: 'Entrez la réponse fausse 2 FALC',
      required: false,
      section: 'response',
      sectionLabel: 'Réponse fausse 2 FALC',
      translate: true,
      type: 'text',
    },
    {
      id: '63',
      label: 'Réponse fausse 2 falc (ENGLISH)',
      language: 'en',
      mode: 'falc',
      name: 'response2',
      placeholder: 'Entrez la réponse fausse 2 FALC (ENGLISH)',
      rightSideVisible: true,
      required: false,
      section: 'response',
      sectionLabel: 'Réponse fausse 2 FALC',
      type: 'text',
    },
  ],
  //EXPLICATION REPONSE FAUSSE 2
  [
    {
      id: '64',
      label: 'Explication reponse fausse 2',
      language: 'fr',
      mode: 'standard',
      name: 'response2',
      placeholder: 'Entrez l explication&é fausse 2',
      required: false,
      rows: 10,
      section: 'explanation',
      sectionLabel: 'Explication Fausse 2',
      translate: true,
      type: 'text',
    },
    {
      id: '65',
      label: 'Explication reponse fausse 2 (ENGLISH)',
      language: 'en',
      mode: 'standard',
      name: 'response2',
      placeholder: 'Entrez la reponse fausse 2 du quiz (ENGLISH)',
      rightSideVisible: true,
      rows: 10,
      required: false,
      section: 'explanation',
      sectionLabel: 'Explication Fausse 2',
      type: 'text',
    },
  ],
  [
    {
      id: '66',
      label: 'Explication Vrai FALC',
      language: 'fr',
      mode: 'falc',
      name: 'response2',
      placeholder: 'Entrez la réponse FALC du quiz',
      required: false,
      rows: 10,
      section: 'explanation',
      sectionLabel: 'Explication Fausse 2 FALC',
      translate: true,
      type: 'text',
    },
    {
      id: '67',
      label: 'Explication Vrai falc (ENGLISH)',
      language: 'en',
      mode: 'falc',
      name: 'response2',
      placeholder: 'Entrez l explication FALC du quiz (ENGLISH)',
      rightSideVisible: true,
      rows: 10,
      required: false,
      section: 'explanation',
      sectionLabel: 'Explication Fausse 2 FALC',
      type: 'text',
    },
  ],
]
