import { useAppDispatch, useAppSelector } from '@hook/index'
import {
  changeTheme,
  type StateTheme,
} from '@service/redux/slices/reducerTheme'
import { ChangeEvent, type FC, useEffect, useRef } from 'react'

import { State, Theme } from '@/types'

const ChangeTheme: FC = () => {
  const darkCheckbox = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const { theme, isDark }: StateTheme = useAppSelector(
    (state: State) => state.theme
  )

  const switchDarkLight = (value: boolean): void => {
    if (value) dispatch(changeTheme(Theme.DARK))
    else dispatch(changeTheme(Theme.LIGHT))
  }

  const handleSwitchSystem = ({ target }: ChangeEvent) => {
    if ('checked' in target) {
      if (target.checked) dispatch(changeTheme(Theme.SYSTEM))
      else switchDarkLight(isDark)
    }
  }

  const handleSwitchDark = ({ target }: ChangeEvent) => {
    if ('checked' in target) {
      const checked = Boolean(target.checked)
      switchDarkLight(checked)
    }
  }

  useEffect(() => {
    if (darkCheckbox.current && 'indeterminate' in darkCheckbox.current) {
      darkCheckbox.current.indeterminate = theme === Theme.SYSTEM
    }
    return
  }, [theme])

  return (
    <>
      <div id="change-theme">
        <label className="swap h-6 w-full text-center">
          <input
            type="checkbox"
            value={'SYSTEM'}
            checked={theme === Theme.SYSTEM}
            onChange={handleSwitchSystem}
          />
          <div className="swap-on">AUTO</div>
          <div className="swap-off">
            <i>&#x1F5B5;</i>
          </div>
        </label>

        <div className="divider divider-horizontal m-0"></div>

        <label className="flex cursor-pointer gap-2">
          <i>&#x1F31E;</i>
          <input
            className="toggle"
            type="checkbox"
            value={'DARK'}
            ref={darkCheckbox}
            checked={isDark}
            onChange={handleSwitchDark}
            disabled={theme === Theme.SYSTEM}
          />
          <i>&#x1F31C;</i>
        </label>
      </div>
    </>
  )
}

export { ChangeTheme }
