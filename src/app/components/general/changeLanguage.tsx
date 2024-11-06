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
      <div className="toggle-switcher" id="change-language">
        <input
          checked={i18n.language === 'en'}
          ref={checkbox}
          onChange={(e) => void changeLanguage(e)}
          type="checkbox"
          id="checkbox-toggle-language"
        />
        <label
          onClick={() => {
            checkbox.current?.toggleAttribute('checked')
          }}
          htmlFor="checkbox-toggle-language"
          className="show">
          {i18n.language}
        </label>
      </div>
    </>
  )
}

export default ChangeLanguage
