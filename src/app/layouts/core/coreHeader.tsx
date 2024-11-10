import { signOut } from '@service/redux/slices/reducerAuth'
import type { FC } from 'react'

import { ChangeLanguage, ChangeTheme, LogoDedale } from '@/app/components'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import type { State } from '@/types'

const CoreHeader: FC = () => {
  const isLogged: boolean = useAppSelector(
    (state: State) => state.auth.isLogged
  )
  const dispatch = useAppDispatch()
  return (
    <>
      <header>
        {/* Sidebar Burger Icon Menu */}
        <div id="header-left">
          <div id="fixed-header-content">
            {isLogged && (
              <label
                htmlFor="checkbox-toggle-sidebar"
                className="toggle-sidebar menu-burger">
                MENU
                <span></span>
                <span></span>
                <span></span>
              </label>
            )}
            {isLogged && (
              <div className="logo-container">
                <LogoDedale width={140} />
              </div>
            )}
          </div>
        </div>
        <div id="header-right">
          <ChangeLanguage />
          <ChangeTheme />
          {isLogged && (
            <button
              className="btn--primary h-8 text-xs"
              onClick={() => dispatch(signOut())}>
              SIGN OUT
            </button>
          )}
        </div>
      </header>
    </>
  )
}
export default CoreHeader
