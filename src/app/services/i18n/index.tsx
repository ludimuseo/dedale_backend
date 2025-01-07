import enTranslation from '@service/i18n/en/translation.json'
import frTranslation from '@service/i18n/fr/translation.json'
import i18n, { type InitOptions } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const options: InitOptions = {
  resources: {
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
  },
  cleanCode: true,
  debug: process.env.NODE_ENV !== 'production',
  detection: {
    lookupLocalStorage: 'lang',
    order: ['localStorage', 'navigator'],
  },
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
    formatSeparator: '|',
  },
  lowerCaseLng: true,
  supportedLngs: ['en', 'fr'],
}

export default await i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(options)
