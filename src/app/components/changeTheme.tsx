import { type State } from '@/types'
import { type FC } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { type AppDispatch } from '@/app/stores'
import { changeTheme } from '@/app/stores/slices/reducerTheme'
import { useTranslation } from 'react-i18next'
import Input from '@/app/components/input'

const ChangeTheme: FC = () => {
  const { t } = useTranslation()
  const dispatch: AppDispatch = useAppDispatch()
  const currentTheme: string = useAppSelector(
    (state: State) => state.theme.currentTheme
  )
  return (
    <>
      <div>
        <Input
          label={t('theme.light')}
          type="radio"
          name="change-theme"
          uid="change-theme-light"
          value="LIGHT"
          errors={[]}
          onChange={() => dispatch(changeTheme('LIGHT'))}
        />

        <Input
          label={t('theme.dark')}
          type="radio"
          name="change-theme"
          uid="change-theme-dark"
          value="DARK"
          errors={[]}
          onChange={() => dispatch(changeTheme('DARK'))}
        />

        <Input
          label={t('theme.system')}
          type="radio"
          name="change-theme"
          uid="change-theme-system"
          value="SYSTEM"
          errors={[]}
          onChange={() => dispatch(changeTheme('SYSTEM'))}
        />
        {currentTheme}
      </div>
    </>
  )
}

export default ChangeTheme
