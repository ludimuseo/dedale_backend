import { type InputProps } from '@/types'
import { forwardRef } from 'react'

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ uid, label, icon, errors, ...props }, ref) => {
    return (
      <>
        <div>
          <label htmlFor={uid}>{label}</label>
          <div>
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
                <li key={key} className="text-red-400">
                  {message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }
)

export default Input
