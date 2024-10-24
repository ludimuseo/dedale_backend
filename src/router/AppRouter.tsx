import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import DefaultLayout from '@/app/layouts/defaultLayout'
import AuthLayout from '@/app/layouts/authLayout'
import AuthSignIn from '@/app/pages/auth/signin'
import Dashboard from '@/app/pages/dashboard'
import User from '@/app/pages/user'
import UserSettings from '@/app/pages/user/settings'
import UserProfile from '@/app/pages/user/profile'
import LanguageSwitcher from '@/app/components/languageSwitcher'
import ErrorPage from '@/app/pages/errorPage'

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      id: 'root',
      path: '/',
      children: [
        {
          element: <DefaultLayout />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: 'user',
              element: <User />,
            },
            {
              path: 'user/profile',
              element: <UserProfile />,
            },
            {
              path: 'user/settings',
              element: <UserSettings />,
            },
          ],
        },
        {
          path: 'auth',
          element: <AuthLayout />,
          children: [
            {
              index: true,
              element: <Navigate to="/auth/signin" />,
            },
            {
              path: 'signin',
              element: <AuthSignIn />,
            },
          ],
        },
        {
          path: '*',
          element: <ErrorPage />,
        },
      ],
    },
  ])
  return (
    <>
      <LanguageSwitcher />
      <RouterProvider router={router} />
    </>
  )
}

export default AppRouter
