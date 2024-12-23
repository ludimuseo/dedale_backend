import { ChangeTheme } from '@component/index'
import type { FC } from 'react'

const CoreSidebar: FC = () => {
  return (
    <>
      <aside id="menu-sidebar">
        <div>
          <label htmlFor="checkbox-toggle-sidebar">CHECK</label>
          <div className="container">MENU</div>
        </div>
        <div>
          <ChangeTheme />
        </div>
      </aside>
    </>
  )
}
export default CoreSidebar
