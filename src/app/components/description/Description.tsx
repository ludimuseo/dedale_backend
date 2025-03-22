//import { useState } from "react"

import AddDescriptionButton from './AddDescriptionButton'
import DescriptionNavBar from './DescriptionNavBar'
import FileUploadArea from './FileUploadArea'
import MainTextArea from './MainTextArea'

export default function Description() {
  //const [descCount, setDescCount] = useState(1)

  return (
    <>
      <DescriptionNavBar />
      <div className="hero min-h-10 rounded-xl bg-base-100">
        <div className="hero-content flex-col lg:flex-row">
          <FileUploadArea />
          <MainTextArea />
        </div>
      </div>
      <AddDescriptionButton />
    </>
  )
}
