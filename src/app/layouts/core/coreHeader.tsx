import { signOut } from '@service/redux/slices/reducerAuth'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { ChangeLanguage } from '@/app/components'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import type { State } from '@/types'

const CoreHeader: FC = () => {
  const { t } = useTranslation()
  const isLogged: boolean = useAppSelector(
    (state: State) => state.auth.isLogged
  )
  const dispatch = useAppDispatch()
  return (
    <>
      <header>
        {/* Sidebar Burger Icon Menu */}
        <div></div>
        <div id="header-right">
          <ChangeLanguage />
          {isLogged && (
            <button
              className="btn--primary h-8 text-xs"
              onClick={() => dispatch(signOut())}>
              {t('button.signout')}
            </button>
          )}
        </div>
      </header>
    </>
  )
}
export default CoreHeader
