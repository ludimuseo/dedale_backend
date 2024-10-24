/* eslint-disable */
// #!TODO: Test Adding Prefix // Currently Unstable
// Example: https://dedale.com/user/settings
//    to -> https://dedale.com/fr/user/settings
//    or -> https://dedale.com/en/user/settings
import { useEffect, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import ErrorPage from '@/app/pages/errorPage'

const PrefixLang: FC = () => {
  const { i18n } = useTranslation()
  const { lang } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const _fetchData = async () => {
      const supportedLngs: string[] = ['en', 'fr']
      // test if lang is not undefined

      if (lang) {
        if (!supportedLngs.includes(lang)) {
          return <ErrorPage />
        } else if (lang !== i18n.resolvedLanguage) {
          await i18n.changeLanguage(lang)
        }
      } else {
        // rename url if pattern is false
        // if '/en' or '/fr' does not exists inside location.pathname -> add
        const patternPrefixLang = /^(\/en|\/fr)/

        if (!patternPrefixLang.test(location.pathname)) {
          const to: string =
            '/' +
            i18n.resolvedLanguage +
            (location.pathname !== '/' ? location.pathname : '')
          navigate(to, { replace: true })
        }
      }
    }
  }, [lang])
  return (
    <>
      <Outlet />
    </>
  )
}

export default PrefixLang
