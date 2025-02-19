import { ComponentPropsWithoutRef, forwardRef } from 'react'

const Image = forwardRef<HTMLImageElement, ComponentPropsWithoutRef<'image'>>(
  ({ ...props }, ref) => {
    return (
      <>
        <img
          ref={ref}
          className={
            'card border shadow-lg ' +
            (props.className?.length ? props.className : '')
          }
        />
      </>
    )
  }
)
export { Image }
