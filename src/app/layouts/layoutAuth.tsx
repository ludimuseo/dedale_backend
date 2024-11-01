import { type FC } from 'react'
import HeaderComponent from '@/app/layouts/core/componentHeader'
import { Outlet } from 'react-router-dom'
import { State } from '@/types'
import logoDedale1 from '@/assets/imgs/logoDedale_v2.webp'
import logoDedale2 from '@/assets/imgs/logoDedale_v1.webp'
import { useAppSelector } from '@/app/hooks'
import { useTranslation } from 'react-i18next'

const LayoutDefault: FC = () => {
  const { t } = useTranslation()
  const isDark: boolean = useAppSelector((state: State) => state.theme.isDark)
  return (
    <>
      <div id="layout-auth">
        <HeaderComponent />
        <main>
          <section className="auth-info">
            <img src={isDark ? logoDedale1 : logoDedale2} />
            <p>{t('text.description')}</p>
          </section>
          <section className="auth-form">
            <Outlet context={[]} />
          </section>
        </main>
      </div>
    </>
  )
}

export default LayoutDefault
