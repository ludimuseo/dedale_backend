import { useAppSelector } from '@/app/hooks'
import { type PropsWithChildren, type FC } from 'react'
import { type Location, Navigate, useLocation } from 'react-router-dom'
import { type RootState } from '@/app/stores'

const IsAuth: FC = ({ children }: PropsWithChildren) => {
  const isLogged: boolean = useAppSelector(
    (state: RootState) => state.auth.isLogged
  )

  const location: Location = useLocation()

  if (isLogged) return <>{children}</>
  else
    return (
      <Navigate
        to={{ pathname: '/auth/signin' }}
        state={{ from: location }}
        replace={true}
      />
    )
}

export default IsAuth
