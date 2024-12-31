import { type FC } from 'react'

import FormClient from '../forms/formClient/formClient'
import FormJourney from '../forms/formJourney/formJourney'
import FormPlace from '../forms/formPlace/formPlace'

const Dashboard: FC = () => {
  return (
    <>
      <div>
        <h1>FORMULAIRES</h1>
        <div>
          <FormJourney />
          <FormPlace />
          <FormClient />
        </div>
      </div>
    </>
  )
}

export { Dashboard }
