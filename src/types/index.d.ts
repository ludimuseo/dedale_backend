import type {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ReactElement,
} from 'react'

export type SvgProps = ComponentProps<'svg'>

export type InputProps = {
  uid: string
  label: string
  errors: string[]
  icon?: ReactElement
} & ComponentPropsWithoutRef<'input'>
