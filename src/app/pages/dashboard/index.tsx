import { type FC } from 'react'
import { useTranslation } from 'react-i18next'

import { DashboardMenu } from '@/app/components/dashboard/DashboardMenu'
import { useAppSelector } from '@/app/hooks'
import { State } from '@/types'

import { getDashboardConfig } from './getDashboardConfig'

const Dashboard: FC = () => {
  const { t } = useTranslation()
  const menu = getDashboardConfig
  const auth = useAppSelector((state: State) => state.auth)
  return (
    <>
      <header>
        <h1 className="mb-10 mt-10 text-center font-inclusive text-4xl">
          {t('page.dashboard')}
        </h1>
      </header>
      <DashboardMenu menu={menu} auth={auth} />
    </>
  )
}

export { Dashboard }
