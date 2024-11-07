interface GetInputClientConfigType {
  id: string
  label: string
  name: string
  placeholder?: string
  required: boolean
  section: string
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
      section: 'compagny',
      type: 'text',
    },
    {
      id: '1',
      label: 'SIRET',
      name: 'siret',
      placeholder: 'Entrez le SIRET',
      required: false,
      section: 'compagny',
      type: 'text',
    },
    {
      id: '2',
      label: 'Numéro de TVA',
      name: 'tva',
      placeholder: 'Entrez le numéro de TVA',
      required: false,
      section: 'compagny',
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
      type: 'text',
    },
    {
      id: '4',
      label: 'Ville',
      name: 'city',
      placeholder: 'Entrez la ville',
      required: false,
      section: 'address',
      type: 'text',
    },
    {
      id: '5',
      label: 'Pays',
      name: 'country',
      placeholder: 'Entrez le pays',
      required: false,
      section: 'address',
      type: 'text',
    },
    {
      id: '6',
      label: 'Code postal',
      name: 'postal',
      placeholder: 'Entrez le code postal',
      required: false,
      section: 'address',
      type: 'number',
    },
  ],
  [
    {
      id: '7',
      label: 'Nom du contact',
      name: 'contact_name',
      placeholder: 'Entrez le nom du contact',
      required: false,
      section: 'contact',
      type: 'text',
    },
    {
      id: '8',
      label: 'Email',
      name: 'email',
      placeholder: 'Entrez l adresse email',
      required: false,
      section: 'contact',
      type: 'email',
    },
    {
      id: '9',
      label: 'Numero de telephone',
      name: 'phone',
      placeholder: 'Entrez le numero de telephone',
      required: false,
      section: 'contact',
      type: 'tel',
    },
    {
      id: '10',
      label: 'Commentaire',
      name: 'note',
      placeholder: 'Commentaire',
      required: false,
      section: 'contact',
      type: 'text',
    },
  ],
  [
    {
      id: '11',
      label: 'Activé / Desactivé',
      name: 'isActive',
      required: false,
      section: 'status',
      type: 'checkbox',
    },
  ],
]
