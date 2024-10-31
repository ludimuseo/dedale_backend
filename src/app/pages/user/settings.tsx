import { type FC } from 'react'

const UserSettings: FC = () => {
  return (
    <>
      <div>(PAGE CONTENT) - USER → SETTINGS</div>

      <button className="dark:bg-blue-800 bg-blue-200">DARK</button>
      <button className="bg-blue-200 text-black">LIGHT</button>
    </>
  )
}

export default UserSettings
