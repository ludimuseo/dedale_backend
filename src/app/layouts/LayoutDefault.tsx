// import { CloseIcon, HamburgerIcon } from '@component'
import type { FC } from 'react'
import { Outlet } from 'react-router'

import CoreHeader from '@/app/layouts/core/CoreHeader'
// import CoreSidebar from '@/app/layouts/core/coreSidebar'

const LayoutDefault: FC = () => {
  return (
    <>
      <div id="layout-default">
        <CoreHeader
          toggleMenu={
            <>
              {/*
              <label
                id="sidebar-control"
                className="btn btn-ghost swap swap-rotate">
                <input type="checkbox" />
                <CloseIcon className="swap-off" />
                <HamburgerIcon className="swap-on" />
              </label>
              */}
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
