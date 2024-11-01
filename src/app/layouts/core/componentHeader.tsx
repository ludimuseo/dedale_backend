import { type FC } from 'react'
import logoDedale1 from '@/assets/imgs/logoDedale_v2.webp'
// import { useTranslation } from 'react-i18next'
// import { Link } from 'react-router-dom'
// import ChangeLanguage from '@/app/components/changeLanguage'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { type State } from '@/types'
import { signOut } from '@/app/stores/slices/reducerAuth'
import ChangeLanguage from '@/app/components/changeLanguage'

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
        </div>
      </header>
    </>
  )
}
export default HeaderComponent
