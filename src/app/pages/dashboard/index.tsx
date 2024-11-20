import { type FC } from 'react'

import FormClient from '../forms/formClient/formClient'

const Dashboard: FC = () => {
  return (
    <>
      <div>(PAGE CONTENT) - DASHBOARD</div>
      <div className="flex items-center justify-center bg-green-400/25">
        <label htmlFor="checkbox-toggle-sidebar">CHECK</label>
      </div>
      <div>
        <h1>FORMULAIRES</h1>
        <FormClient />
      </div>
    </>
  )
}

export { Dashboard }
