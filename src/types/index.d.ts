import type {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ReactElement,
} from 'react'
import { StateAuth } from '@/app/stores/slices/reducerAuth'
import { StateTheme } from '@/app/stores/slices/reducerTheme'

export type SvgProps = ComponentProps<'svg'>

export type InputProps = {
  uid: string
  label: string
  errors: string[]
  icon?: ReactElement
} & ComponentPropsWithoutRef<'input'>

export interface State {
  auth: StateAuth
  theme: StateTheme
}
