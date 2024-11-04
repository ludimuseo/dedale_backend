import { type FC } from 'react'

import ChangeLanguage from '@/app/components/changeLanguage'
import ChangeTheme from '@/app/components/changeTheme'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { signOut } from '@/app/stores/slices/reducerAuth'
import logoDedale1 from '@/assets/imgs/logoDedale_v2.webp'
import { type State } from '@/types'

const HeaderComponent: FC = () => {
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
        <div>
          {isLogged && (
            <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
          )}
          <ChangeLanguage />
          <ChangeTheme />
        </div>
      </header>
    </>
  )
}
export default HeaderComponent
