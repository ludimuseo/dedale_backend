import '@style/root.scss'
import '@service/i18n'

import { persistor, store } from '@service/redux'
import { StrictMode, Suspense } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import router from '@/app/router'

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
