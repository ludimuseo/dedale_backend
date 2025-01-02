import { type FC } from 'react'

//import TextList from '../talos/TextList'
import TalosHome from '../talos/talosHome'

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
