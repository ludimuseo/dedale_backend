import type { type ComponentPropsWithoutRef, type ComponentProps } from 'react'

export type SvgProps = ComponentProps<'svg'>

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  uid: string
  label: string
  name: string
  children: {
    icon?: React.ReactNode | undefined
    error: React.ReactNode
  }
}
