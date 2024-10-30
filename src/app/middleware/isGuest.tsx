import { type PropsWithChildren, type FC } from 'react'
import { useAppSelector } from '@/app/hooks'
import { type RootState } from '@/app/stores'
import { type Location, Navigate, useLocation } from 'react-router-dom'

const IsGuest: FC = ({ children }: PropsWithChildren) => {
  const isLogged: boolean = useAppSelector(
    (state: RootState) => state.auth.isLogged
  )

  const location: Location = useLocation()

  if (!isLogged) return <>{children}</>
  else
    return (
      <Navigate
        to={{ pathname: '/' }}
        state={{ from: location }}
        replace={true}
      />
    )
}

export default IsGuest
