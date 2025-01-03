import { ChangeLanguage, ChangeTheme, LogoDedale } from '@component/index'
import { useAppDispatch, useAppSelector } from '@hook/index'
import { signOut, StateAuth } from '@service/redux/slices/reducerAuth'
import { type FC, ReactElement, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'

import type { State } from '@/types'

interface HeaderProps {
  toggleMenu: ReactElement<HTMLElement> | null
}

const CoreHeader: FC<HeaderProps> = ({ toggleMenu }) => {
  const { t } = useTranslation()
  const { isLogged, user }: StateAuth = useAppSelector(
    (state: State) => state.auth
  )
  const dispatch = useAppDispatch()
  const hasAvatarImg = !!user?.photoURL?.length
  const modalSignOut = useRef<HTMLDialogElement>(null)
  const handleModalSignOut = () => {
    if (modalSignOut.current) {
      modalSignOut.current.showModal()
    }
  }
  return (
    <>
      <header className="navbar min-h-24 p-4">
        {/* Sidebar Burger Icon Menu */}
        <div className="navbar-start gap-x-3">
          {toggleMenu}
          <div className="logo-container">
            <NavLink to={{ pathname: '/' }}>
              <LogoDedale width={140} />
            </NavLink>
          </div>
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-end">
          {isLogged && !!user && (
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex flex-col items-end">
                <b>{user.pseudo}</b>
                <em>{user.email}</em>
              </div>

              {/* Dropdown Menu */}
              <div className="dropdown dropdown-end dropdown-hover">
                {/* Avatar */}
                <div
                  tabIndex={0}
                  role="button"
                  className={'avatar ' + (hasAvatarImg ? '' : 'placeholder')}>
                  <div
                    className={
                      'w-12 rounded-full' +
                      (hasAvatarImg
                        ? ''
                        : 'bg-neutral-content text-neutral-content')
                    }>
                    <img
                      width={48}
                      height={48}
                      className="avatar"
                      alt="avatar image"
                      src={user.photoURL ?? ''}
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://avatar.iran.liara.run/public/job/designer/female'
                      }}
                    />
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
                  <li>
                    <NavLink to={{ pathname: '/user/create' }}>
                      {t('page.user_create')}
                    </NavLink>
                  </li>
                  <div className="divider m-0"></div>
                  <li>
                    <ChangeLanguage />
                  </li>
                  <div className="divider m-0"></div>
                  <li>
                    <ChangeTheme />
                  </li>
                  <div className="divider m-0"></div>
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
            </div>
          )}
        </div>
      </header>
    </>
  )
}
export default CoreHeader
