import '@style/root.scss'
import '@service/i18n'

import { persistor, store } from '@service/redux'
import { SnackbarProvider } from 'notistack'
import { StrictMode, Suspense } from 'react'
import { createRoot, Root } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { router } from '@/app/router'

const rootElement: HTMLElement = document.getElementById(
  'root'
) as HTMLDivElement
const root: Root = createRoot(rootElement)
root.render(
  <StrictMode>
    <SnackbarProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider
              router={router}
              future={{ v7_startTransition: true }}
            />
          </Suspense>
        </PersistGate>
      </Provider>
    </SnackbarProvider>
  </StrictMode>
)
