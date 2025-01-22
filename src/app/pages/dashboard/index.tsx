import { type FC } from 'react'

import DashboardMenu from '@/app/components/dashboard/dashboardMenu'

import { getDashboardConfig } from './getDashbordConfig'

const Dashboard: FC = () => {
  const menu = getDashboardConfig

  return (
    <>
      <header>
        <h1 className="text-center font-inclusive text-3xl">Dashboard</h1>
      </header>
      <main>
        <DashboardMenu menu={menu} />
      </main>
    </>
  )
}

export { Dashboard }
