import { type FC } from 'react'

import DashboardMenu from '@/app/components/Dashboard/DashboardMenu'
import { useAppSelector } from '@/app/hooks'
import { State } from '@/types'

import { getDashboardConfig } from './getDashbordConfig'

const Dashboard: FC = () => {
  const menu = getDashboardConfig
  const auth = useAppSelector((state: State) => state.auth)
  console.log('auth: ', auth)
  return (
    <>
      <header>
        <h1 className="text-center font-inclusive text-3xl">Dashboard</h1>
      </header>
      <main>
        <DashboardMenu menu={menu} auth={auth} />
      </main>
    </>
  )
}

export { Dashboard }
