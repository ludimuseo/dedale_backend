import { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderComponent from '@/app/layouts/core/headerComponent'
import SidebarComponent from '@/app/layouts/core/sidebarComponent'
import FooterComponent from '@/app/layouts/core/footerComponent'

const DefaultLayout: FC = () => {
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

export default DefaultLayout
