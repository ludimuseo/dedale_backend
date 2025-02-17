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
              const { UserCreate } = await import('@/app/pages/user/create')
              return { Component: UserCreate }
            },
            path: '/user/create',
          },
          {
            async lazy() {
              const { FormMenu } = await import('@/app/pages/forms/formMenu')
              return { Component: FormMenu }
            },
            path: '/form',
          },
          {
            async lazy() {
              const { TextList } = await import('@/app/pages/talos/textList')
              return { Component: TextList }
            },
            path: '/textList',
          },
          {
            async lazy() {
              const { TalosHome } = await import('@/app/pages/talos/talosHome')
              return { Component: TalosHome }
            },
            path: '/talos',
          },
          {
            async lazy() {
              const { TalosInterface } = await import(
                '@/app/pages/talos/talosInterface.tsx'
              )
              return { Component: TalosInterface }
            },
            path: '/interface',
          },
          {
            async lazy() {
              const { Users } = await import('@/app/pages/users/index.tsx')
              return { Component: Users }
            },
            path: '/clientsList',
          },
          //FORMULAIRES
          {
            async lazy() {
              const { FormClient } = await import(
                '@/app/pages/forms/formClient/formClient'
              )
              return { Component: FormClient }
            },
            path: '/form/client',
          },
          {
            async lazy() {
              const { FormPlace } = await import(
                '@/app/pages/forms/formPlace/formPlace'
              )
              return { Component: FormPlace }
            },
            path: '/form/place',
          },
          {
            async lazy() {
              const { FormJourney } = await import(
                '@/app/pages/forms/formJourney/formJourney'
              )
              return { Component: FormJourney }
            },
            path: '/form/journey',
          },
          {
            async lazy() {
              const { FormStep } = await import(
                '@/app/pages/forms/formStep/formStep'
              )
              return { Component: FormStep }
            },
            path: '/form/step',
          },
          {
            async lazy() {
              const { FormPiece } = await import(
                '@/app/pages/forms/formPiece/formPiece'
              )
              return { Component: FormPiece }
            },
            path: '/form/piece',
          },
          {
            async lazy() {
              const { FormGame } = await import(
                '@/app/pages/forms/formGame/formGame'
              )
              return { Component: FormGame }
            },
            path: '/form/game',
          },
          {
            async lazy() {
              const { FormMedal } = await import(
                '@/app/pages/forms/formMedal/formMedal'
              )
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
              const { UsersEdit } = await import('@/app/pages/users/edit')
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
