import { useState } from 'react'

import { CloseIcon } from '../ui/icons/CloseIcon'
import AddDescriptionButton from './AddDescriptionButton'
import DescriptionNavBar from './DescriptionNavBar'
import FileUploadArea from './FileUploadArea'
import MainTextArea from './MainTextArea'

export default function Description() {
  const [descriptions, setDescriptions] = useState([{ id: Date.now() }])

  const handleAddDesc = () => {
    setDescriptions([...descriptions, { id: Date.now() + Math.random() }])
  }

  const handleRemoveDesc = (id: number) => {
    setDescriptions(descriptions.filter((desc) => desc.id !== id))
  }

  return (
    <>
      <DescriptionNavBar />
      {descriptions.map((desc) => (
        <div
          key={desc.id}
          className="relative mb-4 rounded-xl border bg-base-100 p-4 shadow">
          <div className="hero min-h-10">
            <div className="hero-content flex-col lg:flex-row">
              <FileUploadArea />
              <MainTextArea />
            </div>
          </div>
          <button
            className="absolute right-2 top-2 text-red-500 hover:text-red-700"
            onClick={() => {
              handleRemoveDesc(desc.id)
            }}
            aria-label="Supprimer la description">
            <CloseIcon />
          </button>
        </div>
      ))}
      <AddDescriptionButton handleAddDesc={handleAddDesc} />
    </>
  )
}
