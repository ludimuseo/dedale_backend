import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElem: HTMLElement | null = document.getElementById('root')
if (rootElem) {
  createRoot(rootElem).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
