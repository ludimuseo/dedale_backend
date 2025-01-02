import { type FC } from 'react'

import { TalosHome } from '../talos/talosHome'

//import TextList from '../talos/TextList'

const Dashboard: FC = () => {
  return (
    <>
      <div>(PAGE CONTENT) - DASHBOARD</div>
      <div>
        <h1>TALOS</h1>
        <div>
          {/* <TextList /> */}
          <TalosHome />
        </div>
      </div>
    </>
  )
}

export { Dashboard }
