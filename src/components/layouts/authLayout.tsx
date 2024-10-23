import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Outlet } from 'react-router-dom'

const AuthLayout: FC = () => {
  const { t } = useTranslation()
  const pageUrls: { name: string; path: string }[] = [
    { name: 'auth', path: '/auth' }, // REDIRECTION FROM /auth TO /auth/signin
    { name: 'auth_signin', path: '/auth/signin' },
  ]
  return (
    <>
      AUTH_LAYOUT
      <br />
      <nav>
        <ul className="flex justify-center gap-x-2 underline">
          {pageUrls.map((page, i) => (
            <li key={i} className="">
              <Link to={page.path}>{t(`page.${page.name}`)}</Link>
            </li>
          ))}
        </ul>
        <Link to="/">{t('page.dashboard')}</Link>
      </nav>
      <br />
      <hr />
      <Outlet context={[]} />
    </>
  )
}

export default AuthLayout
