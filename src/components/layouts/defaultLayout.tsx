import { type FC } from 'react'
import { Link, Outlet } from 'react-router-dom'

const DefaultLayout: FC = () => {
  const pageUrls: { name: string; path: string }[] = [
    { name: 'Dashboard', path: '/' },
    { name: 'User', path: '/user' },
    { name: 'User Profile', path: '/user/profile' },
    { name: 'User Settings', path: '/user/settings' },
  ]
  return (
    <>
      DEFAULT_LAYOUT
      <br />
      <nav>
        <ul className="flex justify-center gap-x-2 underline">
          {pageUrls.map((page, i) => (
            <li key={i}>
              <Link to={page.path}>{page.name}</Link>
            </li>
          ))}
        </ul>
        <Link to="/auth">Authentication</Link>
      </nav>
      <br />
      <hr />
      <Outlet context={[]} />
    </>
  )
}

export default DefaultLayout
