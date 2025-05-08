import { BlockAvatar, ChangeLanguage, ChangeTheme } from '@component'
import { useAppDispatch, useAppSelector, useNotification } from '@hook'
import { signOut, StateAuth } from '@service/redux/slices/reducerAuth'
import { type FC, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'

import type { State } from '@/types'

const BlockUserMenu: FC = () => {
  const { t } = useTranslation()
  const { push } = useNotification()
  const dispatch = useAppDispatch()
  const { isLogged, user }: StateAuth = useAppSelector(
    (state: State) => state.auth
  )
  const modalSignOut = useRef<HTMLDialogElement>(null)
  const handleModalSignOut = () => {
    if (modalSignOut.current) modalSignOut.current.showModal()
  }

  return (
    <>
      {isLogged && !!user && (
        <div className="flex items-center space-x-3 text-sm">
          <div className="flex flex-col items-end">
            <b>{user.pseudo}</b>
            <em>{user.email}</em>
          </div>

          <div className="dropdown dropdown-end dropdown-hover">
            <BlockAvatar
              alt="user avatar"
              className="avatar rounded-full"
              url={'https://cdn-icons-png.flaticon.com/512/3541/3541871.png'} //user.photoURL
              size={48}
            />
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box border bg-base-100 shadow">
              <li>
                {/* User Profile Page */}
                <NavLink to={{ pathname: '/user/profile' }}>
                  {t('page.user_profile')}
                </NavLink>
              </li>
              <li>
                {/* Account Settings */}
                <NavLink to={{ pathname: '/user/settings' }}>
                  {t('page.user_settings')}
                </NavLink>
              </li>
              <li>
                {/* ADMIN+ ONLY TO CREATE NEW USERS */}
                <NavLink to={{ pathname: '/user/create' }}>
                  {t('page.user_create')}
                </NavLink>
              </li>
              <li className="divider m-0"></li>
              <li>
                <ChangeLanguage />
              </li>
              <li className="divider m-0"></li>
              <li>
                <ChangeTheme />
              </li>
              <li className="divider m-0"></li>
              {/* Modal */}
              <li>
                <button onClick={handleModalSignOut}>
                  {t('button.signout')}
                </button>
              </li>
            </ul>
          </div>
          <dialog
            id="modal-signout"
            className="modal flex justify-center"
            ref={modalSignOut}>
            <div className="modal-box w-72 text-center">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                  {/* ✕ */}
                  <i>&#x2715;</i>
                </button>
              </form>
              <p className="py-4">{t('question.proceed')}</p>
              <button
                onClick={() => {
                  dispatch(signOut())
                  push(t('success.signout'), { type: 'success' })
                }}
                className="font-bold uppercase text-red-500">
                {t('button.accept')}
              </button>
            </div>
          </dialog>
        </div>
      )}
    </>
  )
}

export { BlockUserMenu }
