import '@/assets/styles/root.scss'
import '@/locales/i18n'
import { type Root, createRoot } from 'react-dom/client'
import { StrictMode, Suspense } from 'react'
import { persistor, store } from '@/app/stores'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
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
