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

export interface PlaceType {
  clientId: string
  medalId: string
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
    locationRequired: boolean
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
