import { useAppDispatch } from '@hook'
import { changeTheme } from '@service/redux/slices/reducerTheme'
import { type FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Theme } from '@/types'

const ChangeTheme: FC = () => {
  const { t } = useTranslation()
  const darkCheckbox = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const [isDark, setIsDark] = useState(false)

  const handleChange = () => {
    setIsDark(!isDark)
  }

  useEffect(() => {
    dispatch(changeTheme(Theme.SYSTEM))
    return
  }, [dispatch])
  useEffect(() => {
    dispatch(changeTheme(isDark ? Theme.DARK : Theme.LIGHT))
    return
  }, [dispatch, isDark])

  return (
    <>
      <label className="change-theme flex cursor-pointer gap-2">
        <span>{t('page.theme')}</span>
        {/* 🌞 */}
        <i>&#x1F31E;</i>
        <input
          className="toggle"
          type="checkbox"
          value={'DARK'}
          ref={darkCheckbox}
          checked={isDark}
          onChange={handleChange}
        />
        {/* 🌚 */}
        <i>&#x1F31A;</i>
      </label>
    </>
  )
}

export { ChangeTheme }
