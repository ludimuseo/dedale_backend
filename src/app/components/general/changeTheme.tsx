import {
  changeTheme,
  setDarkMode,
  type StateTheme,
} from '@service/redux/slices/reducerTheme'
import { type FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Input from '@/app/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { type State, Theme } from '@/types'

const ChangeTheme: FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { theme }: StateTheme = useAppSelector((state: State) => state.theme)
  //
  useEffect(() => {
    const mediaWatcher: MediaQueryList = window.matchMedia(
      '(prefers-color-scheme: dark)'
    )
    // Detect if system changed theme
    const detectedSystemChangedTheme = (e: MediaQueryListEvent) => {
      if (theme === Theme.SYSTEM) {
        dispatch(setDarkMode(e.matches))
      }
    }
    if ('addEventListener' in mediaWatcher) {
      mediaWatcher.addEventListener('change', detectedSystemChangedTheme)
      switch (theme) {
        case Theme.DARK:
          dispatch(setDarkMode(true))
          break
        case Theme.LIGHT:
          dispatch(setDarkMode(false))
          break
        case Theme.SYSTEM:
          dispatch(
            setDarkMode(
              window.matchMedia('(prefers-color-scheme: dark)').matches
            )
          )
          break
        default:
          console.info('IGNORE -> Theme.CUSTOM ... for now')
          break
      }
    }
    return () => {
      mediaWatcher.removeEventListener('change', detectedSystemChangedTheme)
    }
  }, [theme, dispatch])

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

export default ChangeTheme
