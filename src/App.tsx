import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import DefaultLayout from '@/components/layouts/defaultLayout'
import AuthLayout from '@/components/layouts/authLayout'
import AuthSignIn from '@/app/auth/signin'
import Dashboard from '@/app/dashboard'
import User from '@/app/user'
import UserSettings from '@/app/user/settings'
import UserProfile from '@/app/user/profile'
import LanguageSwitcher from '@/components/languageSwitcher'
import ErrorPage from '@/app/errorPage'

const App = () => {
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

export default App
