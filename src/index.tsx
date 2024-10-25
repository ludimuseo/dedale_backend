import { StrictMode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import AppRouter from '@/app/router/AppRouter'
import '@/assets/styles/root.scss'
import '@/locales/i18n'

const rootElement: HTMLElement | null = document.getElementById('root')
if (rootElement) {
  const root: Root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <AppRouter />
    </StrictMode>
  )
}
