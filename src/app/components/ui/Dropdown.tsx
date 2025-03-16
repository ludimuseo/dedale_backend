import { forwardRef } from 'react'

import type { DropdownProps } from '@/types'

const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ uid, label, insideForm, errors, options, placeholder, ...props }, ref) => {
    return (
      <>
        <div className={insideForm ? 'form--group' : ''}>
          {!!label.length && <label htmlFor={uid}>{label}</label>}
          <div className="relative">
            <select
              className="select select-bordered w-full"
              id={uid}
              ref={ref}
              data-errors={!!errors.length}
              {...props}>
              <option value="" disabled>
                {placeholder}
              </option>
              {options?.map((opt, index) => (
                <option key={index} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          {!!errors.length && (
            <ul className="text-red-500">
              {errors.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }
)

export { Dropdown }
