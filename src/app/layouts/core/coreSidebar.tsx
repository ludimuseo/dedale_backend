import type { FC } from 'react'

import { ChangeTheme } from '@/app/components'

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
