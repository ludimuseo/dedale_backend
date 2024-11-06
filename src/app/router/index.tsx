import type { Router as RemixRouter } from '@remix-run/router'
import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from 'react-router-dom'

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
              const Dashboard = await import('@/app/pages/dashboard')
              return { Component: Dashboard.default }
            },
            path: '/',
          },
          {
            async lazy() {
              const User = await import('@/app/pages/user')
              return { Component: User.default }
            },
            path: '/user',
          },
          {
            async lazy() {
              const UserProfile = await import('@/app/pages/user/profile')
              return { Component: UserProfile.default }
            },
            path: '/user/profile',
          },
          {
            async lazy() {
              const UserSettings = await import('@/app/pages/user/settings')
              return { Component: UserSettings.default }
            },
            path: '/user/settings',
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
              const AuthSignin = await import('@/app/pages/auth/signin')
              return { Component: AuthSignin.default }
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

const router: RemixRouter = createBrowserRouter(routes)

export default router
