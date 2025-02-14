// interface User {
//     placeId: string[]
//     journeyId: string[]
//     stepId: string[]
//     medalId: string[]
//     profile: {
//         username: string
//         email: string
//         token: string
//         role: string
//         createdAt: Date
//         updatedAt: Date
//         logs: Date[]
//     }
//     settieng: {
//         isContrast: boolean
//         isFalc: boolean
//         avatar: string
//         language: string
//         isTutorial: boolean
//     }
// }
export const getSelectConfig = [
  {
    id: '01',
    label: 'ADMIN',
    section: 'profile',
    field: 'role',
  },
  {
    id: '02',
    label: 'REFERENT',
    section: 'profile',
    field: 'role',
  },
  {
    id: '03',
    label: 'CORRECTOR',
    section: 'profile',
    field: 'role',
  },
]

export const getInputConfig = [
  {
    id: 10,
    label: 'Pseudo:',
    section: 'profile',
    field: 'pseudo',
    placeholder: "Entre le pseudo de l'utilisateur",
    type: 'text',
    maxLength: 50,
  },
  {
    id: 11,
    label: 'Prénom:',
    section: 'profile',
    field: 'name',
    placeholder: "Entre le prenom de l'utilisateur",
    type: 'text',
    maxLength: 50,
  },
  {
    id: 12,
    label: 'Nom:',
    section: 'profile',
    field: 'username',
    placeholder: "Entre le nom de l'utilisateur",
    type: 'text',
    maxLength: 50,
  },
  {
    id: 13,
    label: 'Email:',
    section: 'profile',
    field: 'email',
    placeholder: "Entre l'email de l'utilisateur",
    type: 'email',
    maxLength: 50,
  },
  {
    id: 14,
    label: 'Mot de passe:',
    section: 'profile',
    field: 'password',
    placeholder: "Entre le mot de passe de l'utilisateur",
    type: 'password',
    maxLength: 50,
  },
  {
    id: 15,
    label: 'Token:',
    section: 'profile',
    field: 'token',
    placeholder: "Entre le token de l'utilisateur",
    type: 'text',
    maxLength: 50,
  },
]
