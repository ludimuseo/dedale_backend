import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Outlet } from 'react-router-dom'

const DefaultLayout: FC = () => {
  const { t } = useTranslation()
  const pageUrls: { name: string; path: string }[] = [
    { name: 'dashboard', path: '/' },
    { name: 'user', path: '/user' },
    { name: 'user_profile', path: '/user/profile' },
    { name: 'user_settings', path: '/user/settings' },
  ]
  return (
    <>
      DEFAULT_LAYOUT
      <br />
      <nav>
        <ul className="flex justify-center gap-x-2 underline">
          {pageUrls.map((page, key) => (
            <li key={key}>
              <Link to={page.path}>{t(`page.${page.name}`)}</Link>
            </li>
          ))}
        </ul>
        <Link to="/auth">{t('page.auth_signin')}</Link>
      </nav>
      <br />
      <hr />
      <Outlet context={[]} />
    </>
  )
}

export default DefaultLayout
