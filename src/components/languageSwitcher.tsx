import { type FC } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher: FC = () => {
  const { i18n, t } = useTranslation()

  const supportedLngs: string[] =
    typeof i18n.options.supportedLngs == 'object'
      ? i18n.options.supportedLngs.filter((lng: string) => lng.length <= 2)
      : []

  const changeLanguage = async (lng: string): Promise<void> => {
    await i18n.changeLanguage(lng)
  }

  return (
    <>
      <div>
        <div className="flex justify-center gap-x-2">
          {supportedLngs.map((lng, i) => (
            <button
              key={i}
              type="button"
              onClick={() => void changeLanguage(lng)}
              className="uppercase">
              {lng}
            </button>
          ))}
        </div>
        <h4>
          {t('text.current_language')}: {t(`lang.${i18n.language}`)}
        </h4>
      </div>
    </>
  )
}

export default LanguageSwitcher
