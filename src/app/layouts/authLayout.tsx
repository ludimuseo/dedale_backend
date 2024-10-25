import { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderComponent from '@/app/layouts/core/headerComponent'

const DefaultLayout: FC = () => {
  return (
    <>
      <HeaderComponent />
      <main>
        <p className="bg-red-500">AUTH_LAYOUT</p>
        <Outlet context={[]} />
      </main>
    </>
  )
}

export default DefaultLayout
