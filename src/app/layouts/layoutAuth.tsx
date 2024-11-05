import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

import DedaleLogo from '@/app/icons/_DedaleLogo'
import HeaderComponent from '@/app/layouts/core/componentHeader'

const LayoutDefault: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <div id="layout-auth">
        <HeaderComponent />
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

export default LayoutDefault
