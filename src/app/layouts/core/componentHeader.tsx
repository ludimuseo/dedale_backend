import { signOut } from '@service/redux/slices/reducerAuth'
import { type FC } from 'react'

import ChangeLanguage from '@/app/components/general/changeLanguage'
import ChangeTheme from '@/app/components/general/changeTheme'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import DedaleLogo from '@/app/icons/_DedaleLogo'
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
              <DedaleLogo width={140} />
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
