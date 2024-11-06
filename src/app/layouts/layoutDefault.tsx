import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

import CoreHeader from '@/app/layouts/core/coreHeader'
import CoreSidebar from '@/app/layouts/core/coreSidebar'

const LayoutDefault: FC = () => {
  return (
    <>
      <div id="layout-default">
        <input id="checkbox-toggle-sidebar" type="checkbox" />
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
