import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom'
import LayoutAuth from '@/app/layouts/layoutAuth'
import LayoutDefault from '@/app/layouts/layoutDefault'
import PageError from '@/app/pages/pageError'
import { type Router as RemixRouter } from '@remix-run/router'
import RouteAuth from '@/app/middleware/routeAuth'
import RouteGuest from '@/app/middleware/routeGuest'

const routes: RouteObject[] = [
  {
    id: 'root',
    errorElement: <PageError />,
    children: [
      // Default Layout
      {
        element: (
          <RouteAuth role={null}>
            <LayoutDefault />
          </RouteAuth>
        ),
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
        element: (
          <RouteGuest>
            <LayoutAuth />
          </RouteGuest>
        ),
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
