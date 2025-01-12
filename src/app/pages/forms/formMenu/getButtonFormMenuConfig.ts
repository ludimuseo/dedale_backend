interface FormMenu {
  id: string
  title: string
  description: string
  alt: string
  image: string
  route: string
}

export const getButtonFormMenuConfig: FormMenu[] = [
  {
    id: '0',
    title: 'Client',
    description: 'Creer un client: entreprise, association, particulier',
    alt: 'formulaire client',
    image: '/src/assets/imgs/formMenu/icone-utilisateur.png',
    route: '/form/client',
  },
  {
    id: '1',
    title: 'Lieu',
    description: 'Creer un Lieu de type Musée, Parc, Chateau, ou autre...',
    alt: 'formulaire lieu',
    image: '/src/assets/imgs/formMenu/icone-lieu.png',
    route: '/form/place',
  },
  {
    id: '2',
    title: 'Parcours',
    description: 'Creer un parcours lié au lieu',
    alt: 'formulaire parcours',
    image: '/src/assets/imgs/formMenu/icone-parcours.png',
    route: '/form/journey',
  },
  // {
  //     id: "3",
  //     title: "Etape",
  //     description: "Creer une étape de parcours",
  //     alt: "formulaire étape",
  //     image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  //     route: '/form/step',
  // },
  // {
  //     id: "4",
  //     title: "Oeuvre",
  //     description: "Creer une oeuvre en rapport à une étape",
  //     alt: "formulaire oeuvre",
  //     image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  //     route: '/form/piece',
  // },
  {
    id: '5',
    title: 'Jeu',
    description: "Creer le quiz de l'étape en ayant l'oeuvre comme thème",
    alt: 'formulaire jeu',
    image: '/src/assets/imgs/formMenu/icone-jeux.png',
    route: '/form/game',
  },
  // {
  //     id: "6",
  //     title: "Médaille",
  //     description: "Creer une Médaille de lieu, de parcours ou d'étape",
  //     alt: "formulaire médaille",
  //     image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  //     route: '/form/medal',
  // }
]
