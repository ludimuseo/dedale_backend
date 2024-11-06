import { forwardRef } from 'react'

import type { InputProps } from '@/types'

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ uid, label, icon, insideForm, errors, ...props }, ref) => {
    return (
      <>
        <div className={insideForm ? 'form--group' : ''}>
          <label htmlFor={uid}>{label}</label>
          <div className="relative">
            <input
              id={uid}
              ref={ref}
              data-errors={!!errors.length}
              {...props}
            />
            {icon && <span>{icon}</span>}
          </div>
          {!!errors.length && (
            <ul>
              {errors.map((message, key) => (
                <li key={key}>{message}</li>
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }
)

export default Input
