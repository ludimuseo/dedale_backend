interface ContributorType {
  name: string
  gitHub: string
  avatar: string
  contributesTo: ContributesToType[]
  developper: string
}
interface ContributesToType {
  projectName: string
  projectImg: string
}

const serverApi: ContributesToType = {
  projectName: 'Server Api',
  projectImg: '',
}
const backOffice: ContributesToType = {
  projectName: 'Server Api',
  projectImg: '',
}
const talos: ContributesToType = {
  projectName: 'Server Api',
  projectImg: '',
}
const talosBrandingPage: ContributesToType = {
  projectName: 'Server Api',
  projectImg: '',
}
const dedaleMobileApp: ContributesToType = {
  projectName: 'Dedale',
  projectImg: '',
}

export const getContributorConfig: ContributorType[] = [
  {
    name: 'Aurelie Gayout',
    gitHub: 'https://github.com/Lily87280/',
    avatar: 'https://avatars.githubusercontent.com/u/128263899?v=4',
    contributesTo: [talos],
    developper: 'FrontEnd',
  },
  {
    name: 'Maeva Rodrigues',
    gitHub: 'https://github.com/Maeva-RODRIGUES/',
    avatar: 'https://avatars.githubusercontent.com/u/167294285?v=4',
    contributesTo: [serverApi],
    developper: 'BackEnd',
  },
  {
    name: 'GJMCharles',
    gitHub: 'https://github.com/GJMCharles',
    avatar: 'https://avatars.githubusercontent.com/u/91600327?v=4',
    contributesTo: [serverApi, backOffice, dedaleMobileApp],
    developper: 'FullStack',
  },
  {
    name: 'Fédéric Bourigault',
    gitHub: 'https://github.com/fred2541/',
    avatar: 'https://avatars.githubusercontent.com/u/3463006?v=4',
    contributesTo: [serverApi],
    developper: 'Backend - DevOps',
  },
  {
    name: 'Aurelien Fidele',
    gitHub: 'https://github.com/A-Fidele/',
    avatar: 'https://avatars.githubusercontent.com/u/128374528?v=4',
    contributesTo: [backOffice, talos],
    developper: 'Front-End',
  },
  {
    name: 'Auriane Maquaire',
    gitHub: 'https://github.com/AurianeMaq',
    avatar: 'https://avatars.githubusercontent.com/u/198619749?v=4',
    contributesTo: [talos],
    developper: 'Front-End',
  },
  {
    name: 'Mouad Maataoui',
    gitHub: 'https://github.com/Mouad-Maataoui/',
    avatar: 'https://avatars.githubusercontent.com/u/151648856?v=4',
    contributesTo: [backOffice],
    developper: 'Front-End',
  },
  {
    name: 'Victor Leonard',
    gitHub: 'https://github.com/echo-vic/',
    avatar: 'https://avatars.githubusercontent.com/u/18648482?v=4',
    contributesTo: [backOffice],
    developper: 'Front-End',
  },
  {
    name: 'Camille Benhammadi',
    gitHub: ' https://github.com/CYL-B/',
    avatar: 'https://avatars.githubusercontent.com/u/88055801?v=4',
    contributesTo: [talos],
    developper: 'Front-End',
  },
  {
    name: 'Aline Leroy',
    gitHub: 'https://github.com/AlineAl',
    avatar: 'https://avatars.githubusercontent.com/u/65423571?v=4',
    contributesTo: [dedaleMobileApp],
    developper: 'FullStack',
  },
  {
    name: 'Haya Aouate',
    gitHub: 'https://github.com/HayaAouate',
    avatar: 'https://avatars.githubusercontent.com/u/145683041?v=4',
    contributesTo: [talosBrandingPage],
    developper: 'Front-End',
  },
  {
    name: 'Raphael Bensoussan',
    gitHub: 'https://github.com/RaphaelBensoussan',
    avatar: 'https://avatars.githubusercontent.com/u/145433689?v=4',
    contributesTo: [talosBrandingPage],
    developper: 'Front-End',
  },
]
