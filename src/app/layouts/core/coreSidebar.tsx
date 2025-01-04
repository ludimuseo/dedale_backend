import type { FC } from 'react'

const CoreSidebar: FC = () => {
  return (
    <>
      <aside id="sidebar">
        <ul className="menu w-56 rounded-box bg-base-200">
          <li>
            <a>Item 1</a>
          </li>
          <li>NO MENU</li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </aside>
    </>
  )
}
export default CoreSidebar
