import '@service/i18n'
import '@style/root.scss'
import 'regenerator-runtime/runtime'

import { ThemeProvider } from '@context/index'
import { persistor, store } from '@service/redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MotionConfig } from 'framer-motion'
import { SnackbarProvider } from 'notistack'
import { StrictMode, Suspense } from 'react'
import { createRoot, Root } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import { PersistGate } from 'redux-persist/integration/react'

import { router } from '@/app/router'

const queryClient = new QueryClient()

const rootElem: HTMLElement = document.getElementById('root') as HTMLDivElement
const root: Root = createRoot(rootElem)
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <MotionConfig reducedMotion="user">
                  <RouterProvider router={router} />
                </MotionConfig>
              </Suspense>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </SnackbarProvider>
    </QueryClientProvider>
  </StrictMode>
)
