import { type ChangeEvent, type FC, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const ChangeLanguage: FC = () => {
  const { i18n } = useTranslation()
  const checkbox = useRef<HTMLInputElement>(null)

  const changeLanguage = async ({
    target,
  }: ChangeEvent<HTMLInputElement>): Promise<void> => {
    await i18n.changeLanguage(target.checked ? 'en' : 'fr')
  }

  return (
    <>
      <div id="change-language">
        <label
          onClick={() => {
            checkbox.current?.toggleAttribute('checked')
          }}
          htmlFor="checkbox-toggle-language">
          {i18n.language}
        </label>
        <input
          checked={i18n.language === 'en'}
          ref={checkbox}
          onChange={(e) => void changeLanguage(e)}
          type="checkbox"
          id="checkbox-toggle-language"
        />
      </div>
    </>
  )
}

export { ChangeLanguage }
