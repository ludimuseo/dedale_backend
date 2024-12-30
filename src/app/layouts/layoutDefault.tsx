import { LogoDedale } from '@component/index'
import type { FC } from 'react'
import { NavLink, Outlet } from 'react-router'

import CoreHeader from '@/app/layouts/core/coreHeader'
import CoreSidebar from '@/app/layouts/core/coreSidebar'

const LayoutDefault: FC = () => {
  return (
    <>
      <div id="layout-default">
        <input id="checkbox-toggle-sidebar" type="checkbox" />
        <div id="floating-header-logo">
          {/* // Menu Burger - 100% CSS */}
          <label
            htmlFor="checkbox-toggle-sidebar"
            className="toggle-sidebar menu-burger">
            <span></span>
            <span></span>
            <span></span>
          </label>
          {/* // Logo Dedale */}
          <div className="logo-container">
            <NavLink to={{ pathname: '/' }}>
              <LogoDedale width={140} />
            </NavLink>
          </div>
        </div>
        <div id="outer-content">
          <CoreHeader />
          <main className="content">
            <Outlet context={[]} />
          </main>
        </div>
        <CoreSidebar />
      </div>
    </>
  )
}

export default LayoutDefault
