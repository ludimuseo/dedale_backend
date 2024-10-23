import { type FC } from 'react'
import { Link, Outlet } from 'react-router-dom'

const AuthLayout: FC = () => {
  const pageUrls: { name: string; path: string }[] = [
    { name: 'Auth', path: '/auth' }, // REDIRECTION FROM /auth TO /auth/signin
    { name: 'AuthSignIn', path: '/auth/signin' },
  ]
  return (
    <>
      AUTH_LAYOUT
      <br />
      <nav>
        <ul className="flex justify-center gap-x-2 underline">
          {pageUrls.map((page, i) => (
            <li key={i} className="">
              <Link to={page.path}>{page.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <br />
      <hr />
      <Outlet context={[]} />
    </>
  )
}

export default AuthLayout
