import { forwardRef, useEffect, useState } from 'react'

import type { InputProps } from '@/types'

interface IconType {
  props: { children: { props: object } }
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ uid, label, icon, insideForm, errors, ...props }, ref) => {
    const [iconProps, setIconProps] = useState<object>({})

    const handleIconOnClick = () => {
      if ('onClick' in iconProps) {
        iconProps.onClick()
      }
    }

    useEffect(() => {
      const inputIcon: IconType | undefined = icon
      if (inputIcon?.props.children.props) {
        setIconProps(inputIcon.props.children.props)
      }
    }, [icon, iconProps])

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
            {icon && (
              <span
                className={
                  Object.keys(iconProps).length ? 'cursor-pointer' : ''
                }
                onClick={handleIconOnClick}>
                {icon}
              </span>
            )}
          </div>
          {!!errors.length && (
            <ul className="text-red-500">
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

export { Input }
