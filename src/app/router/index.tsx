import { createBrowserRouter, Navigate, type RouteObject } from 'react-router'

import LayoutAuth from '@/app/layouts/LayoutAuth'
import LayoutDefault from '@/app/layouts/LayoutDefault'
import RouteAuth from '@/app/middleware/RouteAuth'
import RouteGuest from '@/app/middleware/RouteGuest'
import PageError from '@/app/pages/PageError'

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
              const { UserProfile } = await import('@/app/pages/user/Profile')
              return { Component: UserProfile }
            },
            path: '/user/profile',
          },
          {
            async lazy() {
              const { FAQ } = await import('@/app/pages/faq')
              return { Component: FAQ }
            },
            path: '/faq',
          },
          {
            async lazy() {
              const { UserSettings } = await import('@/app/pages/user/Settings')
              return { Component: UserSettings }
            },
            path: '/user/settings',
          },
          {
            async lazy() {
              const { UserCreate } = await import('@/app/pages/user/Create')
              return { Component: UserCreate }
            },
            path: '/user/create',
          },
          {
            async lazy() {
              const { FormMenu } = await import('@/app/pages/forms/FormMenu')
              return { Component: FormMenu }
            },
            path: '/form',
          },
          //TALOS
          {
            async lazy() {
              const { TextList } = await import('@/app/pages/talos/TextList')
              return { Component: TextList }
            },
            path: '/textList',
          },
          {
            async lazy() {
              const { ValidateText } = await import(
                '@/app/pages/talos/ValidateText'
              )
              return { Component: ValidateText }
            },
            path: '/validateText',
          },
          {
            async lazy() {
              const { TalosHome } = await import('@/app/pages/talos/TalosHome')
              return { Component: TalosHome }
            },
            path: '/talos',
          },
          {
            async lazy() {
              const { TalosInterface } = await import(
                '@/app/pages/talos/TalosInterface'
              )
              return { Component: TalosInterface }
            },
            path: '/interface',
          },
          {
            async lazy() {
              const { Users } = await import('@/app/pages/users')
              return { Component: Users }
            },
            path: '/clientsList',
          },
          //FORMULAIRES
          {
            async lazy() {
              const { FormClient } = await import(
                '@/app/pages/forms/FormClient'
              )
              return { Component: FormClient }
            },
            path: '/form/client',
          },
          {
            async lazy() {
              const { FormPlace } = await import('@/app/pages/forms/FormPlace')
              return { Component: FormPlace }
            },
            path: '/form/place',
          },
          {
            async lazy() {
              const { FormJourney } = await import(
                '@/app/pages/forms/FormJourney'
              )
              return { Component: FormJourney }
            },
            path: '/form/journey',
          },
          {
            async lazy() {
              const { FormStep } = await import('@/app/pages/forms/FormStep')
              return { Component: FormStep }
            },
            path: '/form/step',
          },
          {
            async lazy() {
              const { FormPiece } = await import('@/app/pages/forms/FormPiece')
              return { Component: FormPiece }
            },
            path: '/form/piece',
          },
          {
            async lazy() {
              const { FormGame } = await import('@/app/pages/forms/FormGame')
              return { Component: FormGame }
            },
            path: '/form/game',
          },
          {
            async lazy() {
              const { FormMedal } = await import('@/app/pages/forms/FormMedal')
              return { Component: FormMedal }
            },
            path: '/form/medal',
          },
          {
            async lazy() {
              const { Users } = await import('@/app/pages/users')
              return { Component: Users }
            },
            path: '/users',
          },
          {
            async lazy() {
              const { UsersEdit } = await import('@/app/pages/users/Edit')
              return { Component: UsersEdit }
            },
            path: '/users/:id',
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
              const { AuthSignIn } = await import('@/app/pages/auth/Signin')
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
