import { forwardRef, MouseEvent } from 'react'

import { DescriptionType } from '@/types'

import FileUploadArea from './FileUploadArea'
import FlagLanguage from './FlagLanguage'
interface MainTextAreaProps {
  descriptions: DescriptionType[]
  handleAddDescription: (
    id: string,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void
  handleFileUpload: (
    file: File,
    fileType: string,
    //name: string,
    event: MouseEvent<HTMLButtonElement>,
    desc: DescriptionType
  ) => void
  language: string
  isFalc: boolean
  imagePreview?: string
  setImagePreview: (preview: string | null) => void
  imgFile?: File
  setImgFile: (file: File | null) => void
}
const MainTextArea = forwardRef<HTMLTextAreaElement, MainTextAreaProps>(
  (
    {
      descriptions,
      handleAddDescription,
      handleFileUpload,
      language,
      isFalc,
      imagePreview,
      setImagePreview,
      imgFile,
      setImgFile,
    },
    ref
  ) => {
    const desc = descriptions[0] // comme on passe un seul desc à la fois

    return (
      <>
        <FileUploadArea
          handleFileUpload={handleFileUpload}
          desc={desc}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          imgFile={imgFile}
          setImgFile={setImgFile}
        />
        <FlagLanguage language={language} />
        <label className="font-inclusive text-2xl">
          {isFalc ? 'Texte FALC' : 'Texte Standard'}
        </label>
        <div className="border-stroke shadow-defaul dark:bg-boxdark ml-2 mt-1 flex w-screen flex-row rounded-lg border">
          <textarea
            name="description"
            ref={ref}
            id={String(desc.id)}
            className="textarea textarea-bordered w-full font-inclusive text-xl"
            placeholder="Inscrivez votre texte"
            rows={10}
            value={desc.text}
            onChange={(event) => {
              handleAddDescription(desc.id, event)
            }}></textarea>
        </div>
      </>
    )
  }
)

export default MainTextArea
