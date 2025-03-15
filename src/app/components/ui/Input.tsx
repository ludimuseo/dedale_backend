import {
  DOMAttributes,
  forwardRef,
  MouseEvent,
  useEffect,
  useState,
} from 'react'

import type { InputProps } from '@/types'

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ uid, label, icon, insideForm, errors, ...props }, ref) => {
    const [iconProps, setIconProps] = useState<DOMAttributes<Element>>()
    const handleIconOnClick = (ev: MouseEvent) => {
      if (iconProps?.onClick) {
        iconProps.onClick.apply(this, [ev])
      }
    }

    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setIconProps(icon?.props)
    }, [icon])

    return (
      <>
        <div className={insideForm ? 'form--group' : ''}>
          {!!label.length && <label htmlFor={uid}>{label}</label>}
          <div className="relative">
            <input
              id={uid}
              ref={ref}
              data-errors={!!errors.length}
              {...props}
            />
            {icon && (
              <span
                className={iconProps?.onClick ? 'cursor-pointer' : ''}
                onClick={(ev) => {
                  handleIconOnClick(ev)
                }}>
                {icon}
              </span>
            )}
          </div>
          {!!errors.length && (
            <ul className="text-red-500">
              {errors.map((message, index: number) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }
)

export { Input }
