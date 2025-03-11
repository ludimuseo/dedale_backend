import { ComponentPropsWithoutRef, forwardRef } from 'react'

const FromCard = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ children, title, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className="card mx-0 bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
            {children}
          </div>
        </div>
      </div>
    )
  }
)

export { FromCard }
