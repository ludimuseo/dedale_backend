import { type FC } from 'react'

import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon'
import logoDedale1 from '@/assets/imgs/logoDedale_v2.webp'

const SidebarComponent: FC = () => {
  return (
    <>
      <aside id="menu-sidebar">
        <div className="logo-container">
          <figure>
            <img src={logoDedale1} alt="Logo" />
          </figure>
          <label htmlFor="checkbox-toggle-sidebar">{<ArrowLeftIcon />}</label>
        </div>
        <div className="container">MENU</div>
      </aside>
    </>
  )
}
export default SidebarComponent
