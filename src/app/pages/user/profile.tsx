import { Card } from '@component/index'
import type { FC } from 'react'

const UserProfile: FC = () => {
  return (
    <>
      <div>
        <Card>{'POSTS'}</Card>
        <Card>{'FOLLOWERS'}</Card>
        <Card>{'FOLLOWING'}</Card>
      </div>
    </>
  )
}

export { UserProfile }
