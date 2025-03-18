import { type FC } from 'react'
import { useTranslation } from 'react-i18next'

import { DashboardMenu } from '@/app/components/dashboard/DashboardMenu'
import { useAppSelector } from '@/app/hooks'
import { State } from '@/types'

import { getDashboardConfig } from './GetDashbordConfig'

const Dashboard: FC = () => {
  const { t } = useTranslation()
  const menu = getDashboardConfig
  const auth = useAppSelector((state: State) => state.auth)
  return (
    <>
      <header>
        <h1 className="text-center font-inclusive text-3xl">
          {t('page.dashboard')}
        </h1>
      </header>
      <main>
        <DashboardMenu menu={menu} auth={auth} />
      </main>
    </>
  )
}

export { Dashboard }
