import { useAppDispatch, useAppSelector } from '@hook/index'
import {
  changeTheme,
  setIsDark,
  type StateTheme,
} from '@service/redux/slices/reducerTheme'
import { Context, createContext, PropsWithChildren, useEffect } from 'react'

import { State, Theme } from '@/types'

const ThemeContext: Context<string> = createContext('')

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const { theme }: StateTheme = useAppSelector((state: State) => state.theme)

  useEffect(() => {
    const mediaWatcher: MediaQueryList = window.matchMedia(
      '(prefers-color-scheme: dark)'
    )

    const executeThemeChange = (value: boolean) => {
      switch (theme) {
        case Theme.DARK:
          dispatch(setIsDark(true)) // force 'TRUE'
          break
        case Theme.LIGHT:
          dispatch(setIsDark(false)) // force 'FALSE'
          break
        case Theme.SYSTEM:
          dispatch(setIsDark(value))
          break
        default:
          break
      }
    }

    mediaWatcher.onchange = (event: MediaQueryListEvent) => {
      executeThemeChange(event.matches)
    }

    executeThemeChange(mediaWatcher.matches)
    dispatch(changeTheme(theme))

    return () => {
      //
    }
  }, [dispatch, theme])

  return (
    <>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </>
  )
}

export { ThemeContext, ThemeProvider }
