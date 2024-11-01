import { type FC } from 'react'
import HeaderComponent from '@/app/layouts/core/componentHeader'
import { Outlet } from 'react-router-dom'
import SidebarComponent from '@/app/layouts/core/componentSidebar'

const LayoutDefault: FC = () => {
  return (
    <>
      <div id="layout-default">
        <input id="checkbox-toggle-sidebar" type="checkbox" />
        <div id="outer-content">
          <HeaderComponent />
          <main className="content">
            <Outlet context={[]} />
          </main>
        </div>
        <SidebarComponent />
      </div>
    </>
  )
}

export default LayoutDefault
