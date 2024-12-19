import type { StateAuth } from '@service/redux/slices/reducerAuth'
import type { StateTheme } from '@service/redux/slices/reducerTheme'
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  ReactElement,
} from 'react'

/* Redux Root State */
export interface State {
  auth: StateAuth
  theme: StateTheme
}

/* USER */
export enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  CONTRIBUTOR = 'CONTRIBUTOR',
}

export interface User {
  uid: string
  role: UserRole | null
  email: string | null
  emailVerified: boolean
  displayName: string | null
  photoURL: string | null
}

/* THEME */
export enum Theme {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
  CUSTOM = 'CUSTOM',
  SYSTEM = 'SYSTEM',
}

export type SvgProps = ComponentProps<'svg'>

export type InputProps = {
  uid: string
  label: string
  errors: string[]
  icon?: ReactElement
  insideForm: boolean
} & ComponentPropsWithoutRef<'input'>

/* ON_SUBMIT_FORM_MESSAGE */
export interface MessageType {
  info: string
  result: boolean
}

export interface GetInputConfigType {
  accessType?: string
  fileType?: string
  id: string
  label: string
  language?: string
  isLocationRequired?: boolean
  mode?: string
  name: string
  option?: string[]
  placeholder?: string
  required: boolean
  rows?: number | undefined
  rightSideVisible?: boolean | undefined
  section: string
  sectionLabel: string
  translate?: boolean
  type?: string
}

/* TYPE GENERIQUE */

export type T = Record<
  string,
  | Address
  | Compagny
  | Contact
  | Status
  | Name
  | Coords
  | Description
  | Standard
  | Falc
  | Audio
  | Content
>

interface Contact {
  name: string
  email: string
  tel: string
  note: string
}

interface Address {
  address: string
  postal: string
  city: string
  country: string
}
interface Compagny {
  name: string
  siret: string
  tva: string
  type: string
  website: string
}

interface Status {
  isActive: boolean //ACTIVER/DESACTIVER LE CLIENT
  isPublished?: boolean
}

interface Name {
  fr: string
  en: string
}
interface Coords {
  lat: number
  lon: number
  isLocationRequired: boolean
}
interface Standard {
  fr: string
  en: string
}
interface Falc {
  fr: string
  en: string
  isValidate?: boolean
}
interface Description {
  standard: Standard
  falc: Falc
}
interface Audio {
  standard: {
    fr: string
    en: string
  }
  falc: {
    fr: string
    en: string
  }
}
interface Content {
  image: string[]
  type: string
}

/* CLIENT */
export interface ClientType {
  company: {
    name: string
    siret: string
    tva: string
    type: string
    website: string
  }
  address: {
    address: string
    postal: string
    city: string
    country: string
  }
  contact: {
    name: string
    email: string
    tel: string
    note: string
  }
  status: {
    isActive: boolean //ACTIVER/DESACTIVER LE CLIENT
  }
}

/* PLACE */
export interface PlaceType {
  clientId: string
  medalId: string
  content: {
    image: string[]
    type: string
  }
  address: {
    address: string
    postal: string
    city: string
    country: string
  }
  name: {
    fr: string
    en: string
  }
  coords: {
    lat: number
    lon: number
    isLocationRequired: boolean
  }
  description: {
    standard: {
      fr: string
      en: string
    }
    falc: {
      fr: string
      en: string
      isValidate: boolean
    }
  }
  audio: {
    standard: {
      fr: string
      en: string
    }
    falc: {
      fr: string
      en: string
    }
  }
  status: {
    isActive: boolean
    isPublished: boolean
  }
}
