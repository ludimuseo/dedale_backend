import { StrictMode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import AppRouter from '@/router/AppRouter'
import '@/styles.css'
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
