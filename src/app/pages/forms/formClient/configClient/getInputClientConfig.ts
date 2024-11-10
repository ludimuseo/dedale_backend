interface GetInputClientConfigType {
  id: string
  label: string
  name: string
  placeholder?: string
  required: boolean
  rows?: number | undefined
  section: string
  sectionLabel: string
  type: string
}

export const getInputClientConfig: GetInputClientConfigType[][] = [
  [
    {
      id: '0',
      label: 'Nom Enteprise ou société',
      name: 'name',
      placeholder: "Entrez le nom de l'entrprise ou société",
      required: false,
      section: 'company',
      sectionLabel: 'Information client',
      type: 'text',
    },
    {
      id: '1',
      label: 'SIRET',
      name: 'siret',
      placeholder: 'Entrez le SIRET',
      required: false,
      section: 'company',
      sectionLabel: 'Information client',
      type: 'text',
    },
    {
      id: '2',
      label: 'Numéro de TVA',
      name: 'tva',
      placeholder: 'Entrez le numéro de TVA',
      required: false,
      section: 'company',
      sectionLabel: 'Information client',
      type: 'text',
    },
    {
      id: '12',
      label: 'Site internet',
      name: 'website',
      placeholder: 'Entrez le site internet',
      required: false,
      section: 'company',
      sectionLabel: 'Information client',
      type: 'text',
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
      sectionLabel: 'Information client',
      type: 'text',
    },
    {
      id: '4',
      label: 'Ville',
      name: 'city',
      placeholder: 'Entrez la ville',
      required: false,
      section: 'address',
      sectionLabel: 'Information client',
      type: 'text',
    },
    {
      id: '5',
      label: 'Pays',
      name: 'country',
      placeholder: 'Entrez le pays',
      required: false,
      section: 'address',
      sectionLabel: 'Information client',
      type: 'text',
    },
    {
      id: '6',
      label: 'Code postal',
      name: 'postal',
      placeholder: 'Entrez le code postal',
      required: false,
      section: 'address',
      sectionLabel: 'Information client',
      type: 'number',
    },
  ],
  [
    {
      id: '7',
      label: 'Nom du contact',
      name: 'contact_name',
      placeholder: 'Entrez le nom du contact',
      required: true,
      section: 'contact',
      sectionLabel: 'Contact client',
      type: 'text',
    },
    {
      id: '8',
      label: 'Email',
      name: 'email',
      placeholder: 'Entrez l adresse email',
      required: true,
      section: 'contact',
      sectionLabel: 'Contact client',
      type: 'email',
    },
    {
      id: '9',
      label: 'Numero de telephone',
      name: 'phone',
      placeholder: 'Entrez le numero de telephone',
      required: false,
      section: 'contact',
      sectionLabel: 'Contact client',
      type: 'tel',
    },
    {
      id: '10',
      label: 'Commentaire',
      name: 'note',
      placeholder: 'Commentaire',
      required: false,
      rows: 4, //si rows alors c'est un textarea
      section: 'contact',
      sectionLabel: 'Contact client',
      type: 'text',
    },
  ],
]
