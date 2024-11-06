import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

import DedaleLogo from '@/app/icons/_DedaleLogo'
import CoreHeader from '@/app/layouts/core/coreHeader'

const LayoutAuth: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <div id="layout-auth">
        <CoreHeader />
        <main>
          <section id="auth-info">
            <div>
              <DedaleLogo width={240} />
              <p className="max-w-sm">{t('text.description')}</p>
            </div>
          </section>
          <section id="auth-form">
            <Outlet context={[]} />
          </section>
        </main>
      </div>
    </>
  )
}

export default LayoutAuth
