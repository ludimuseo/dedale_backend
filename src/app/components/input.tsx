import { type InputProps } from '@/types'
import { forwardRef } from 'react'
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ uid, label, errors, children, ...props }, ref) => {
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
            {children?.icon && <span>{children.icon}</span>}
          </div>
          <ul>
            {!!errors.length &&
              errors.map((message, key) => (
                <li key={key} className="text-red-400">
                  {message}
                </li>
              ))}
          </ul>
        </div>
      </>
    )
  }
)

export default Input
