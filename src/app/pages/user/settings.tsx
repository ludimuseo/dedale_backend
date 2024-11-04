import { type FC } from 'react'

const UserSettings: FC = () => {
  return (
    <>
      <div>(PAGE CONTENT) - USER → SETTINGS</div>

      <button className="bg-blue-200 dark:bg-blue-800">DARK</button>
      <button className="bg-blue-200 text-black">LIGHT</button>
    </>
  )
}

export default UserSettings
