import { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderComponent from '@/app/layouts/core/headerComponent'
import SidebarComponent from '@/app/layouts/core/sidebarComponent'
import FooterComponent from '@/app/layouts/core/footerComponent'

const DefaultLayout: FC = () => {
  return (
    <>
      <HeaderComponent />
      <SidebarComponent />
      <main>
        <p className="bg-blue-500">DEFAULT_LAYOUT</p>
        <Outlet context={[]} />
      </main>
      <FooterComponent />
    </>
  )
}

export default DefaultLayout
