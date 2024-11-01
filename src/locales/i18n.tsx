import i18n, { type InitOptions } from 'i18next'
import detector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const options: InitOptions = {
  backend: {
    loadPath: '/src/locales/{{lng}}/{{ns}}.json',
  },
  cleanCode: true,
  debug: process.env.NODE_ENV !== 'production',
  detection: {
    lookupQuerystring: 'lang',
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  lng: 'fr',
  lowerCaseLng: true,
  supportedLngs: ['en', 'fr'],
}

await i18n.use(Backend).use(detector).use(initReactI18next).init(options)

export default i18n
