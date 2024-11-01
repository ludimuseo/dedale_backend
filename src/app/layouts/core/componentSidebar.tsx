import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon'
import { type FC } from 'react'
import logoDedale1 from '@/assets/imgs/logoDedale_v2.webp'

// import { useTranslation } from 'react-i18next'
// import { Link } from 'react-router-dom'

const SidebarComponent: FC = () => {
  // const { t } = useTranslation()
  // const pageUrls: { name: string; path: string }[] = [
  //   { name: 'auth_signin', path: '/auth/signin' },
  //   { name: 'dashboard', path: '/' },
  //   { name: 'user', path: '/user' },
  //   { name: 'user_profile', path: '/user/profile' },
  //   { name: 'user_settings', path: '/user/settings' },
  // ]
  return (
    <>
      <aside id="menu-sidebar">
        <div className="logo-container">
          <figure>
            <img src={logoDedale1} alt="Logo" />
          </figure>
          <label
            htmlFor="checkbox-toggle-sidebar"
            className="xl:hidden flex justify-center items-center hover:text-red-400 w-12 cursor-pointer">
            {<ArrowLeftIcon />}
          </label>
        </div>
        <div className="container">MENU</div>
      </aside>
    </>
  )
}
export default SidebarComponent
