import { StrictMode, Suspense } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import router from '@/app/router'
import '@/assets/styles/root.scss'
import '@/locales/i18n'
import { persistor, store } from './app/stores'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'

const rootElement: HTMLElement | null = document.getElementById('root')
if (rootElement) {
  const root: Root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </PersistGate>
      </Provider>
    </StrictMode>
  )
}
