import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import ErrorPage from '@/app/pages/errorPage'
import { type Router as RemixRouter } from '@remix-run/router'

const routes: RouteObject[] = [
  {
    id: 'root',
    errorElement: <ErrorPage />,
    children: [
      // Default Layout
      {
        async lazy() {
          const DefaultLayout = await import('@/app/layouts/defaultLayout')
          return { Component: DefaultLayout.default }
        },
        children: [
          {
            path: '/',
            async lazy() {
              const Dashboard = await import('@/app/pages/dashboard')
              return { Component: Dashboard.default }
            },
          },
          {
            path: '/user',
            async lazy() {
              const User = await import('@/app/pages/user')
              return { Component: User.default }
            },
          },
          {
            path: '/user/profile',
            async lazy() {
              const UserProfile = await import('@/app/pages/user/profile')
              return { Component: UserProfile.default }
            },
          },
          {
            path: '/user/settings',
            async lazy() {
              const UserSettings = await import('@/app/pages/user/settings')
              return { Component: UserSettings.default }
            },
          },
        ],
      },
      // Auth Layout
      {
        async lazy() {
          const AuthLayout = await import('@/app/layouts/authLayout')
          return { Component: AuthLayout.default }
        },
        children: [
          {
            path: '/auth',
            element: <Navigate to={{ pathname: '/auth/signin' }} />,
          },
          {
            path: '/auth/signin',
            async lazy() {
              const AuthSignin = await import('@/app/pages/auth/signin')
              return { Component: AuthSignin.default }
            },
          },
        ],
      },
    ],
  },
]

const router: RemixRouter = createBrowserRouter(routes)

export default router
