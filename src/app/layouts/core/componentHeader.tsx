import { useAppDispatch, useAppSelector } from '@/app/hooks'
import ChangeLanguage from '@/app/components/changeLanguage'
import ChangeTheme from '@/app/components/changeTheme'
import { type FC } from 'react'
import { type State } from '@/types'
import logoDedale1 from '@/assets/imgs/logoDedale_v2.webp'
import { signOut } from '@/app/stores/slices/reducerAuth'

// import { useTranslation } from 'react-i18next'
// import { Link } from 'react-router-dom'

const HeaderComponent: FC = () => {
  // const { t } = useTranslation()
  const isLogged: boolean = useAppSelector(
    (state: State) => state.auth.isLogged
  )
  const dispatch = useAppDispatch()
  return (
    <>
      <header>
        {/* Sidebar Burger Icon Menu */}
        <div>
          {isLogged && (
            <label htmlFor="checkbox-toggle-sidebar" className="toggle-sidebar">
              MENU
            </label>
          )}
          {isLogged && (
            <div className="logo-container">
              <figure>
                <img width={'160px'} src={logoDedale1} alt="Logo" />
              </figure>
            </div>
          )}
        </div>
        <div className="text-black">
          {isLogged && (
            <button
              className="bg-slate-400"
              onClick={() => dispatch(signOut())}>
              SIGN OUT
            </button>
          )}
          <ChangeLanguage />
          <ChangeTheme />
        </div>
      </header>
    </>
  )
}
export default HeaderComponent
