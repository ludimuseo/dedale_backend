import { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderComponent from '@/app/layouts/core/componentHeader'

const LayoutDefault: FC = () => {
  return (
    <>
      <div id="layout-auth">
        <HeaderComponent />
        <main>
          <div id="inner-main-content">
            <p className="bg-red-500 text-center">AUTH_LAYOUT</p>
            <Outlet context={[]} />
          </div>
        </main>
      </div>
    </>
  )
}

export default LayoutDefault
