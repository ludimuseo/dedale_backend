import { Input } from '@component/index'
import { useAppDispatch, useAppSelector } from '@hook/index'
import {
  changeTheme,
  type StateTheme,
} from '@service/redux/slices/reducerTheme'
import { type FC } from 'react'
import { useTranslation } from 'react-i18next'

import { type State, Theme } from '@/types'

const ChangeTheme: FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { theme }: StateTheme = useAppSelector((state: State) => state.theme)

  return (
    <>
      <div id="change-theme">
        <Input
          label={t('theme.light')}
          type="radio"
          name="change-theme"
          uid="change-theme-light"
          value="LIGHT"
          checked={theme === Theme.LIGHT}
          errors={[]}
          onChange={() => dispatch(changeTheme(Theme.LIGHT))}
          insideForm={false}
        />

        <Input
          label={t('theme.dark')}
          type="radio"
          name="change-theme"
          uid="change-theme-dark"
          value="DARK"
          checked={theme === Theme.DARK}
          errors={[]}
          onChange={() => dispatch(changeTheme(Theme.DARK))}
          insideForm={false}
        />

        <Input
          label={t('theme.system')}
          type="radio"
          name="change-theme"
          uid="change-theme-system"
          value="SYSTEM"
          checked={theme === Theme.SYSTEM}
          errors={[]}
          onChange={() => dispatch(changeTheme(Theme.SYSTEM))}
          insideForm={false}
        />
      </div>
    </>
  )
}

export { ChangeTheme }
