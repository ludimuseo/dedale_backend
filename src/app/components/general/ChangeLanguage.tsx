import { ChangeEvent, type FC } from 'react'
import { useTranslation } from 'react-i18next'

const ChangeLanguage: FC = () => {
  const { t, i18n } = useTranslation()
  const changeLanguage = async ({
    target,
  }: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if ('checked' in target) {
      await i18n.changeLanguage(target.checked ? 'fr' : 'en')
    }
  }
  return (
    <>
      <div id="change-language">
        <label className="swap swap-rotate w-full">
          <input
            type="checkbox"
            checked={i18n.language === 'fr'}
            onChange={(e) => void changeLanguage(e)}
          />
          <span className="swap-off">{t('lang.en')}</span>
          <span className="swap-on">{t('lang.fr')}</span>
        </label>
      </div>
    </>
  )
}

export { ChangeLanguage }
