import '@/assets/scss/styles.scss'
import '@/locales/i18n'

import { StrictMode, Suspense } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import router from '@/app/router'
import { persistor, store } from '@/app/stores'

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
