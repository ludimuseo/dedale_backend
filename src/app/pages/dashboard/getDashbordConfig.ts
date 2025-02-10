export interface DashboardConfig {
  id: string
  title: string
  ariaLabel: string
  subTitle: string
  image: string
  imageAlt: string
  route: string
}

export const getDashboardConfig: DashboardConfig[] = [
  {
    id: '0',
    title: 'CREATION DE PARCOURS',
    ariaLabel: 'Accéder à la création de parcours',
    subTitle: 'Créer les parcours et jeux pas à pas.',
    image: 'DEDALE_MOBILE',
    imageAlt: 'Formulaires',
    route: '/form',
  },
  {
    id: '2',
    title: 'LISTES',
    ariaLabel: 'CONSULTER LES CLIENTS',
    subTitle: 'Accéder a la liste des clients',
    image: 'DEDALE_MOBILE',
    imageAlt: 'Liste clients',
    route: '/clientsList',
  },

  {
    id: '1',
    title: 'INTERFACE TALOS',
    ariaLabel: "Accéder à l'interface Talos",
    subTitle: 'Correction et lecture de texte.',
    image: 'TALOS',
    imageAlt: 'Talos',
    route: '/talos',
  },
]
