import i18n, { type InitOptions } from 'i18next'
import detector from 'i18next-browser-languagedetector'
import backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const options: InitOptions = {
  backend: {
    loadPath: '/src/app/services/i18n/{{lng}}/{{ns}}.json',
  },
  cleanCode: true,
  debug: process.env.NODE_ENV !== 'production',
  detection: {
    lookupLocalStorage: 'lang',
    order: ['localStorage', 'navigator'],
  },
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
    formatSeparator: '|',
  },
  lowerCaseLng: true,
  supportedLngs: ['en', 'fr'],
}

export default await i18n
  .use(backend)
  .use(detector)
  .use(initReactI18next)
  .init(options)
