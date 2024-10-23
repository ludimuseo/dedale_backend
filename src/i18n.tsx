import i18n, { type InitOptions } from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'

const options: InitOptions = {
  fallbackLng: 'fr',
  debug: process.env.NODE_ENV !== 'production',
  supportedLngs: ['en', 'fr'],
  interpolation: {
    escapeValue: false,
  },
  detection: {
    lookupQuerystring: 'lang',
  },
  lowerCaseLng: true,
  cleanCode: true,
}

await i18n.use(Backend).use(detector).use(initReactI18next).init(options)

export default i18n
