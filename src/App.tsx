import {
  createBrowserRouter,
  type LoaderFunctionArgs,
  Navigate,
  RouterProvider,
} from 'react-router-dom'
import DefaultLayout from '@/components/layouts/defaultLayout'
import AuthLayout from '@/components/layouts/authLayout'
import AuthSignIn from '@/app/auth/signin'
import Dashboard from '@/app/dashboard'
import User from '@/app/user'
import UserSettings from '@/app/user/settings'
import UserProfile from '@/app/user/profile'

const protectedRoute = ({ request }: LoaderFunctionArgs): boolean => {
  // TEST ROUTE MIDDLEWARE
  console.info('request: ', request)
  return false
}

const App = () => {
  const router = createBrowserRouter([
    {
      id: 'root',
      path: '/',
      loader: protectedRoute, // #!TODO: Improve Middleware
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
      path: '/auth',
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
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
