interface GetInputClientConfigType {
  category: string
  id: string
  label: string
  name: string
  placeholder: string
  required: boolean
  type: string
}

export const getInputClientConfig: GetInputClientConfigType[][] = [
  [
    {
      category: 'compagny',
      id: '0',
      label: 'Nom Enteprise ou société',
      name: 'name',
      placeholder: "Entrez le nom de l'entrprise ou société",
      required: false,
      type: 'text',
    },
    {
      category: 'compagny',
      id: '1',
      label: 'SIRET',
      name: 'siret',
      placeholder: 'Entrez le SIRET',
      required: false,
      type: 'text',
    },
    {
      category: 'compagny',
      id: '2',
      label: 'Numéro de TVA',
      name: 'tva',
      placeholder: 'Entrez le numéro de TVA',
      required: false,
      type: 'text',
    },
  ],
  [
    {
      category: 'compagny',
      id: '3',
      label: 'Adresse',
      name: 'address',
      placeholder: 'Entrez le nom de la rue',
      required: false,
      type: 'text',
    },
    {
      category: 'compagny',
      id: '4',
      label: 'Ville',
      name: 'city',
      placeholder: 'Entrez la ville',
      required: false,
      type: 'text',
    },
    {
      category: 'compagny',
      id: '5',
      label: 'Pays',
      name: 'country',
      placeholder: 'Entrez le pays',
      required: false,
      type: 'text',
    },
    {
      category: 'compagny',
      id: '6',
      label: 'Code postal',
      name: 'postal',
      placeholder: 'Entrez le code postal',
      required: false,
      type: 'number',
    },
  ],
  [
    {
      category: 'contact_client',
      id: '7',
      label: 'Nom du contact',
      name: 'contact_name',
      placeholder: 'Entrez le nom du contact',
      required: false,
      type: 'text',
    },
    {
      category: 'contact_client',
      id: '8',
      label: 'Email',
      name: 'email',
      placeholder: 'Entrez l adresse email',
      required: false,
      type: 'email',
    },
    {
      category: 'contact_client',
      id: '9',
      label: 'Numero de telephone',
      name: 'phone',
      placeholder: 'Entrez le numero de telephone',
      required: false,
      type: 'tel',
    },
    {
      category: 'contact_client',
      id: '10',
      label: 'Commentaire',
      name: 'note',
      placeholder: 'Commentaire',
      required: false,
      type: 'text',
    },
  ],
]
