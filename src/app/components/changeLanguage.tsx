import { type FC } from 'react'
import { useTranslation } from 'react-i18next'

const ChangeLanguage: FC = () => {
  const { i18n } = useTranslation()

  const changeLanguage = async (): Promise<void> => {
    await i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')
  }

  return (
    <>
      <div className="toggle-switcher">
        <input
          type="checkbox"
          id="checkbox-toggle-language"
          checked={i18n.language === 'en'}
        />
        <label
          onClick={() => void changeLanguage()}
          htmlFor="checkbox-toggle-language"
          className="show"
          about="">
          {i18n.language}
        </label>
      </div>
    </>
  )
}

export default ChangeLanguage
