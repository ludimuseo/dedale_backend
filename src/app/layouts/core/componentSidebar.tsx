import { type FC } from 'react'

import DedaleLogo from '@/app/icons/_DedaleLogo'
import ArrowLeftIcon from '@/app/icons/ArrowLeftIcon'

const SidebarComponent: FC = () => {
  return (
    <>
      <aside id="menu-sidebar">
        <div className="logo-container">
          <DedaleLogo width={140} />
          <label htmlFor="checkbox-toggle-sidebar">{<ArrowLeftIcon />}</label>
        </div>
        <div className="container">MENU</div>
      </aside>
    </>
  )
}
export default SidebarComponent
