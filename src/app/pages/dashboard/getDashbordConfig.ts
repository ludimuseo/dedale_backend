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
    image: '/src/assets/imgs/formMenu/dedale-mobile.svg',
    imageAlt: 'Formulaires',
    route: '/form',
  },
  {
    id: '1',
    title: 'INTERFACE TALOS',
    ariaLabel: "Accéder à l'interface Talos",
    subTitle: 'Correction et lecture de texte.',
    image: '/src/assets/imgs/talos-backoffice.svg',
    imageAlt: 'Talos',
    route: '/talos',
  },
]
