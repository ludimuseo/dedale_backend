import { type InputProps } from '@/types'
import { forwardRef } from 'react'

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ uid, label, name, children, ...props }, ref) => {
    return (
      <>
        <div>
          <label htmlFor={uid}>{label}</label>
          <div>
            <input id={uid} ref={ref} name={name} {...props} />
            <span>{children.icon}</span>
            {children.error}
          </div>
        </div>
      </>
    )
  }
)

export default Input
