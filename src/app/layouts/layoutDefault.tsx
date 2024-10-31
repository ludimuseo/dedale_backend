import { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderComponent from '@/app/layouts/core/componentHeader'
import SidebarComponent from '@/app/layouts/core/componentSidebar'
import FooterComponent from '@/app/layouts/core/componentFooter'

const LayoutDefault: FC = () => {
  return (
    <>
      <div id="layout-default">
        <SidebarComponent />
        <div id="inner-layout">
          <HeaderComponent />
          <main className="content">
            <Outlet context={[]} />
          </main>
          <FooterComponent />
        </div>
      </div>
    </>
  )
}

export default LayoutDefault
