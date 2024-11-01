import i18n, { type InitOptions } from 'i18next'
import Backend from 'i18next-http-backend'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const options: InitOptions = {
  lng: 'fr',
  fallbackLng: 'en',
  supportedLngs: ['en', 'fr'],
  debug: process.env.NODE_ENV !== 'production',
  backend: {
    loadPath: '/src/locales/{{lng}}/{{ns}}.json',
  },
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
