import type { FC } from 'react'

import DedaleLogo from '@/app/icons/_DedaleLogo'
import ArrowLeftIcon from '@/app/icons/ArrowLeftIcon'

const CoreSidebar: FC = () => {
  return (
    <>
      <aside id="menu-sidebar">
        <div className="logo-container">
          <DedaleLogo forceDark={true} width={140} />
          <label htmlFor="checkbox-toggle-sidebar">{<ArrowLeftIcon />}</label>
        </div>
        <div className="container">MENU</div>
      </aside>
    </>
  )
}
export default CoreSidebar
