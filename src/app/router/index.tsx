import { createBrowserRouter, Navigate, type RouteObject } from 'react-router'

import LayoutAuth from '@/app/layouts/layoutAuth'
import LayoutDefault from '@/app/layouts/layoutDefault'
import RouteAuth from '@/app/middleware/routeAuth'
import RouteGuest from '@/app/middleware/routeGuest'
import PageError from '@/app/pages/pageError'

const routes: RouteObject[] = [
  {
    children: [
      // Default Layout
      {
        children: [
          {
            async lazy() {
              const { Dashboard } = await import('@/app/pages/dashboard')
              return { Component: Dashboard }
            },
            path: '/',
          },
          {
            async lazy() {
              const { User } = await import('@/app/pages/user')
              return { Component: User }
            },
            path: '/user',
          },
          {
            async lazy() {
              const { UserProfile } = await import('@/app/pages/user/profile')
              return { Component: UserProfile }
            },
            path: '/user/profile',
          },
          {
            async lazy() {
              const { UserSettings } = await import('@/app/pages/user/settings')
              return { Component: UserSettings }
            },
            path: '/user/settings',
          },
          {
            async lazy() {
              const { TextList } = await import('@/app/pages/talos/textList')
              return { Component: TextList }
            },
            path: '/textList',
          },
          // {
          //   async lazy() {
          //     const { TalosInterface } = await import('@/app/pages/talos/TalosInterface.tsx')
          //     return { Component: TalosInterface }
          //   },
          //   path: '/interface',
          // },
          {
            async lazy() {
              const { UserCreate } = await import('@/app/pages/user/create')
              return { Component: UserCreate }
            },
            path: '/user/create',
          },
        ],
        element: (
          <RouteAuth role={null}>
            <LayoutDefault />
          </RouteAuth>
        ),
      },
      // Auth Layout
      {
        children: [
          {
            element: <Navigate to={{ pathname: '/auth/signin' }} />,
            path: '/auth',
          },
          {
            async lazy() {
              const { AuthSignIn } = await import('@/app/pages/auth/signin')
              return { Component: AuthSignIn }
            },
            path: '/auth/signin',
          },
        ],
        element: (
          <RouteGuest>
            <LayoutAuth />
          </RouteGuest>
        ),
      },
    ],
    errorElement: <PageError />,
    id: 'root',
  },
]

const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
  hydrationData: {},
})

export { router }
