import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import DefaultLayout from '@/app/layouts/defaultLayout'
import AuthLayout from '@/app/layouts/authLayout'
import AuthSignIn from '@/app/pages/auth/signin'
import Dashboard from '@/app/pages/dashboard'
import User from '@/app/pages/user'
import UserSettings from '@/app/pages/user/settings'
import UserProfile from '@/app/pages/user/profile'
import LanguageSwitcher from '@/app/components/languageSwitcher'
import ErrorPage from '@/app/pages/errorPage'
import store from '@/app/stores'

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
              id: 'dasboard',
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
      <Provider store={store}>
        <LanguageSwitcher />
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default AppRouter
