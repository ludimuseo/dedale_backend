import { type ChangeEvent, type FC, useState } from 'react'

import { Card } from '@/app/components'

const UserSettings: FC = () => {
  const [imageSrc, setImageSrc] = useState<string>('')
  const loadFile = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const reader: FileReader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') setImageSrc(reader.result)
    }
    if (target.files) reader.readAsDataURL(target.files[0])
  }

  return (
    <>
      <div>
        <Card>{'NOM'}</Card>
        <Card>{'PRENOM'}</Card>
        <Card>
          {'BIOGRAPHY'}
          <textarea
            className="textarea textarea-ghost"
            placeholder="Bio"></textarea>
        </Card>
        <Card>
          {'PHOTO PROFILE'}
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img
                className="avatar"
                src={imageSrc}
                onError={(e) => {
                  e.currentTarget.src = 'https://avatar.iran.liara.run/public/2'
                }}
              />
            </div>
          </div>

          <br />
          <Card>
            <div className="flex flex-row items-center">
              <label htmlFor="profile-picture">upload</label>
              <input
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/webp"
                id="profile-picture"
                onChange={loadFile}
              />
              <div className="divider">|</div>
              <button
                onClick={() => {
                  setImageSrc('')
                }}>
                clear
              </button>
            </div>
          </Card>
        </Card>
      </div>
    </>
  )
}

export { UserSettings }
