import { CloseIcon, HamburgerIcon } from '@component/index'
import type { FC } from 'react'
import { Outlet } from 'react-router'

import CoreHeader from '@/app/layouts/core/coreHeader'
// import CoreSidebar from '@/app/layouts/core/coreSidebar'

const LayoutDefault: FC = () => {
  return (
    <>
      <div id="layout-default">
        <CoreHeader
          toggleMenu={
            <>
              <label
                id="sidebar-control"
                className="btn btn-ghost swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />
                {/* close icon */}
                <CloseIcon className="swap-off" />
                {/* hamburger icon */}
                <HamburgerIcon className="swap-on" />
              </label>
            </>
          }
        />
        <div id="inner-content">
          {/* <CoreSidebar /> */}
          <main className="content">
            <Outlet context={[]} />
          </main>
        </div>
      </div>
    </>
  )
}

export default LayoutDefault
