import { InputValue } from '.'
import { PlaceType } from './types'

export interface FormPlaceType extends PlaceType {
  // Form-specific properties
  formId?: string
  isSubmitted?: boolean
  validationErrors?: Record<string, string[] | number>
}

export interface FormDataType {
  clientID: number
  coords: { latitude: number; longitude: number }
  [key: string]: InputValue | { latitude: number; longitude: number }
}
