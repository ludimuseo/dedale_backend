import { ComponentPropsWithoutRef, forwardRef } from 'react'

const Card = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'article'>>(
  ({ children, ...props }, ref) => {
    return (
      <>
        <article
          {...props}
          ref={ref}
          className={
            'card border shadow-lg ' +
            (props.className?.length ? props.className : '')
          }>
          <div className="card-body p-4">{children}</div>
        </article>
      </>
    )
  }
)
export { Card }
