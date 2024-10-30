import {
  createBrowserRouter,
  Navigate,
  RouteObject,
} from 'react-router-dom'
import ErrorPage from '@/app/pages/errorPage'
import { type Router as RemixRouter } from '@remix-run/router'
import { createElement, lazy } from 'react'

const DefaultLayout = lazy(() => import( '@/app/layouts/defaultLayout'))
const AuthLayout = lazy(() => import( '@/app/layouts/authLayout'))
const Dashboard = lazy(() => import('@/app/pages/dashboard'))
const User = lazy(() => import('@/app/pages/user'))
const UserProfile = lazy(() => import('@/app/pages/user/profile'))
const UserSettings = lazy(() => import('@/app/pages/user/settings'))
const AuthSignIn = lazy(() => import('@/app/pages/auth/signin'))

const routes: RouteObject[] = [
  {
    id: 'root',
    errorElement: createElement(ErrorPage),
    children: [
      // Default Layout
      {
        element: createElement(DefaultLayout),
        children: [
          { path: '/', element: createElement(Dashboard) },
          { path: '/user', element: createElement(User) },
          { path: '/user/profile', element: createElement(UserProfile) },
          { path: '/user/settings', element: createElement(UserSettings) },
        ],
      },
      // Auth Layout
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/auth',
            element: <Navigate to={{ pathname: '/auth/signin' }} />,
          },
          { path: '/auth/signin', element: createElement(AuthSignIn) },
        ],
      },
    ],
  },
]

const router: RemixRouter = createBrowserRouter(routes)
// const routes = (
//   <>
//     <Route id="root" errorElement={<ErrorPage />}>
//       {/* // Default Layout */}
//       <Route element={<DefaultLayout />}>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/user" element={<User />} />
//         <Route path="/user/profile" element={<UserProfile />} />
//         <Route path="/user/settings" element={<UserSettings />} />
//       </Route>
//       {/* // Auth Layout */}
//       <Route element={<AuthLayout />}>
//         <Route
//           path="/auth"
//           element={<Navigate to={{ pathname: '/auth/signin' }} />}
//         />
//         <Route path="/auth/signin" element={<AuthSignIn />} />
//       </Route>
//     </Route>
//   </>
// )
// const router: RemixRouter = createBrowserRouter(
//   createRoutesFromElements(routes)
// )

export default router
