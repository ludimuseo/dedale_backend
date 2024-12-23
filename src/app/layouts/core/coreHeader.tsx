import { ChangeLanguage } from '@component/index'
import { useAppDispatch, useAppSelector } from '@hook/index'
import { signOut, StateAuth } from '@service/redux/slices/reducerAuth'
import { type FC, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'

import type { State } from '@/types'

const CoreHeader: FC = () => {
  const { t } = useTranslation()
  const { isLogged, user }: StateAuth = useAppSelector(
    (state: State) => state.auth
  )
  const dispatch = useAppDispatch()
  const modalSignOut = useRef<HTMLDialogElement>(null)
  const handleModalSignOut = () => {
    if (modalSignOut.current) {
      modalSignOut.current.showModal()
    }
  }
  return (
    <>
      <header>
        {/* Sidebar Burger Icon Menu */}
        <div></div>
        <div id="header-right">
          <ChangeLanguage />

          {/* Dropdown Menu */}
          <div className="dropdown dropdown-end dropdown-hover">
            {/* Avatar */}
            {/* !TODO: remove class 'placeholder' if avatar image exists */}
            <div tabIndex={0} role="button" className="avatar placeholder">
              <div className="w-16 rounded-full bg-neutral text-neutral-content">
                <span className="text-2xl">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
              <li>
                <NavLink to={{ pathname: '/user/profile' }}>
                  {t('page.user_profile')}
                </NavLink>
              </li>
              <li>
                <NavLink to={{ pathname: '/user/settings' }}>
                  {t('page.user_settings')}
                </NavLink>
              </li>

              {/* Modal */}
              {isLogged && (
                <li>
                  <button className="" onClick={handleModalSignOut}>
                    {t('button.signout')}
                  </button>
                  <dialog
                    id="modal-signout"
                    className="modal flex justify-center"
                    ref={modalSignOut}>
                    <div className="modal-box w-72 text-center">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                          &#10005;
                        </button>
                      </form>
                      <p className="py-4">{t('question.proceed')}</p>
                      <button
                        onClick={() => dispatch(signOut())}
                        className="font-bold uppercase text-red-500">
                        {t('button.accept')}
                      </button>
                    </div>
                  </dialog>
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>
    </>
  )
}
export default CoreHeader
