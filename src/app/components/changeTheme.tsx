import { type FC, useEffect } from 'react'
import {
  type StateTheme,
  changeTheme,
  setDarkMode,
} from '@/app/stores/slices/reducerTheme'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import Input from '@/app/components/input'
import { type State } from '@/types'
import { useTranslation } from 'react-i18next'

const ChangeTheme: FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { theme }: StateTheme = useAppSelector((state: State) => state.theme)
  useEffect(() => {
    const mediaWatcher: MediaQueryList = window.matchMedia(
      '(prefers-color-scheme: dark)'
    )
    // Detect if system changed theme
    const detectedSystemChangedTheme = (e: MediaQueryListEvent) => {
      if (theme === 'SYSTEM') {
        dispatch(setDarkMode(e.matches))
      }
    }
    if ('addEventListener' in mediaWatcher) {
      mediaWatcher.addEventListener('change', detectedSystemChangedTheme)
      switch (theme) {
        case 'DARK':
          dispatch(setDarkMode(true))
          break
        case 'LIGHT':
          dispatch(setDarkMode(false))
          break
        case 'SYSTEM':
          dispatch(
            setDarkMode(
              window.matchMedia('(prefers-color-scheme: dark)').matches
            )
          )
          break
        default:
          break
      }
    }
    return () => {
      mediaWatcher.removeEventListener('change', detectedSystemChangedTheme)
    }
  }, [theme, dispatch])

  return (
    <>
      <div>
        <Input
          label={t('theme.light')}
          type="radio"
          name="change-theme"
          uid="change-theme-light"
          value="LIGHT"
          checked={theme === 'LIGHT'}
          errors={[]}
          onChange={() => dispatch(changeTheme('LIGHT'))}
        />

        <Input
          label={t('theme.dark')}
          type="radio"
          name="change-theme"
          uid="change-theme-dark"
          value="DARK"
          checked={theme === 'DARK'}
          errors={[]}
          onChange={() => dispatch(changeTheme('DARK'))}
        />

        <Input
          label={t('theme.system')}
          type="radio"
          name="change-theme"
          uid="change-theme-system"
          value="SYSTEM"
          checked={theme === 'SYSTEM'}
          errors={[]}
          onChange={() => dispatch(changeTheme('SYSTEM'))}
        />
      </div>
    </>
  )
}

export default ChangeTheme
