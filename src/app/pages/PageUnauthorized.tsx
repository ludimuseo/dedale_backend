import type { FC } from 'react'
import { NavLink } from 'react-router'

const PageUnauthorized: FC = () => {
  return (
    <>
      <div className="flex min-h-full flex-col items-center justify-center font-inclusive text-3xl">
        {/* 🔐 */}
        <i>&#x1F510;</i>
        UNAUTHORIZED PAGE
        <NavLink to={{ pathname: '/' }}>
          <u>RETURN</u>
        </NavLink>
      </div>
    </>
  )
}

export default PageUnauthorized
